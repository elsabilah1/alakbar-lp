import { PropsWithChildren } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import Sidebar from "@/components/sidebar"

export const metadata: Metadata = { title: "Admin" }

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/signin")

  return (
    <div className="container">
      <Sidebar />
      <main className="ml-16 pb-8 pl-3 pt-6 md:py-10 lg:ml-36 xl:pt-20">
        {children}
      </main>
    </div>
  )
}
