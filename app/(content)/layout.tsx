import { PropsWithChildren } from "react"
import { Metadata } from "next"

import Footer from "./footer"

export const metadata: Metadata = { title: "Home" }

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  )
}
