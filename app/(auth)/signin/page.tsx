import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"

import SignInForm from "./signin-form"

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/dashboard")

  return (
    <div>
      <h1 className="text-4xl">Sign In</h1>
      <SignInForm />
    </div>
  )
}
