import React from "react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

import CardDetail from "./card-detail"
import CardReport from "./card-report"

export default function DashboardPage() {
  return (
    <div>
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/admin" className={buttonVariants()}>
          Kelola Admin
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <CardReport />
        <CardReport />
        <CardReport />
      </div>
      <CardDetail />
    </div>
  )
}
