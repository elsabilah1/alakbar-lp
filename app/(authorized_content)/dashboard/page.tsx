"use client"

import React from "react"
import Link from "next/link"

import useDataList from "@/hooks/useDataList"
import { buttonVariants } from "@/components/ui/button"

import CardDetail from "./card-detail"
import CardReport from "./card-report"

export default function DashboardPage() {
  const { data, loading } = useDataList("orphanage", "/api/orphanage")

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-between gap-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/admin" className={buttonVariants()}>
          Kelola Admin
        </Link>
      </div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="mb-5 grid gap-4 md:grid-cols-3">
            <CardReport
              title="Total Anak Asuh"
              value={data?.report.totalChild}
            />
            <CardReport
              title="Total Donatur Tetap"
              value={data?.report.totalDonor}
            />
            <CardReport
              title="Total Kegiatan"
              value={data?.report.totalActivity}
            />
          </div>
          <CardDetail data={data} />
        </>
      )}
    </div>
  )
}
