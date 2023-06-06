import Link from "next/link"
import axios from "axios"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

async function getData() {
  const url = process.env.NEXTAUTH_URL + "/api/orphanage"
  const { data } = await axios.get(url)
  return data.data
}

export default async function ActivitiesPage() {
  const data = await getData()

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
