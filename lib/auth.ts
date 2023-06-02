import { compare } from "bcrypt"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import connectMongo from "./db"
import Admin from "./models/Admin"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectMongo()
        const admin = await Admin.findOne({ email: credentials?.email })

        if (admin) {
          const isAdmin = await compare(credentials?.password!, admin?.password)

          if (isAdmin) {
            return admin
          }

          throw new Error("wrong credentials")
        }

        throw new Error("wrong credentials")
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
      }

      return session
    },
    async jwt({ token, user }) {
      await connectMongo()
      const dbAdmin = await Admin.findOne({ email: token.email })

      if (!dbAdmin) {
        token.id = user!.id
        return token
      }

      return {
        id: dbAdmin._id,
        name: dbAdmin.fullName,
        email: dbAdmin.email,
      }
    },
  },
}
