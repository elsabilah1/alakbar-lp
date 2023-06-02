import { PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import Sidebar from "@/components/sidebar"

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/signin")

  return (
    <div className="container">
      <Sidebar />
      <main className="ml-16 pl-3 pt-10 xl:pt-20">{children}</main>
    </div>
  )
}
