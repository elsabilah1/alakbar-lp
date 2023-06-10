"use client"

import useDataList from "@/hooks/useDataList"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export default function CardTotal() {
  const { data, loading } = useDataList("detail", "/api/orphanage")

  if (loading) return <div></div>

  return (
    <section className="-bottom-16 z-10 w-full px-8 pb-8 pt-6 md:absolute md:p-0">
      <div className="mx-auto grid max-w-4xl gap-3 md:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center justify-center gap-4">
            <Icons.donation className="h-10 w-10 stroke-emerald-500" />
            <CardTitle>
              <span className="text-5xl font-bold">
                {data.report.totalDonor}
              </span>{" "}
              Donatur
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-center gap-4">
            <Icons.user className="h-10 w-10 stroke-emerald-500" />
            <CardTitle>
              <span className="text-5xl font-bold">
                {data.report.totalChild}
              </span>{" "}
              Anak Asuh
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-center gap-4">
            <Icons.activity className="h-10 w-10 stroke-emerald-500" />
            <CardTitle>
              <span className="text-5xl font-bold">
                {data.report.totalActivity}
              </span>{" "}
              Kegiatan
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}
