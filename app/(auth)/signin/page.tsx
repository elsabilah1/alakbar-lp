import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import SignInForm from "./signin-form"

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/dashboard")

  return (
    <main className="container grid place-items-center pt-10">
      <Card className="border-none lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-3xl">Sign In</CardTitle>
          <CardDescription>Masuk sebagai Admin</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </main>
  )
}
