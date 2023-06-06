"use client"

import useDataList from "@/hooks/useDataList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ActivitiesPage() {
  const { data, loading } = useDataList("detail", "/api/orphanage")

  if (loading) return <div>loading...</div>

  return (
    <>
      <main>
        <section className="container mb-10 pb-8 pt-6 md:py-10">
          <h1 className="mb-10 text-3xl font-bold">Kegiatan Panti</h1>
          <div className="grid gap-4 lg:grid-cols-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <Card className="h-96">1</Card>
            ))}
          </div>
        </section>
      </main>
      <div className="absolute bottom-0 w-full">
        <footer className="container grid h-[5rem] place-items-center">
          <p className="text-sm font-semibold">
            &copy; Copyright {data.name} 2023
          </p>
        </footer>
      </div>
    </>
  )
}
