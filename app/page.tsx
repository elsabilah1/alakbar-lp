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

export default async function HomePage() {
  const data = await getData()

  return (
    <>
      <main>
        <section className="container relative grid h-screen bg-emerald-200 text-emerald-100 md:h-[calc(100vh-100px)] md:grid-cols-2">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-800 to-transparent"></div>
          <div className="z-20 grid items-center">
            <div className="space-y-4">
              <h1 className="text-5xl font-semibold leading-tight">
                Panti Asuhan {data.name} Pekan Baru
              </h1>
              <p className="w-2/3">{data.snippet}</p>
              <Link
                target="_blank"
                href="https://seedeka.com/listing/panti-asuhan-al-akbar"
                className={buttonVariants({ size: "lg", variant: "secondary" })}
              >
                <span className="font-bold">MULAI DONASI</span>{" "}
                <Icons.arrowRight className="ml-3 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 h-[28rem] w-3/4 -translate-y-1/2 rounded-l-full bg-[url('/test.jpg')] bg-cover lg:w-1/2"></div>
        </section>

        <section className="container grid min-h-[20rem] items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="mx-auto grid max-w-5xl grid-cols-3 gap-3">
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
                <Icons.child className="h-10 w-10 stroke-emerald-500" />
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

        <section className="container h-[30rem] bg-emerald-800 pb-8 pt-6 md:py-10">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-emerald-50">
              Kegiatan Panti
            </h1>
            <Link href="/activities">lainnya</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>1</Card>
            <Card>1</Card>
            <Card>1</Card>
            <Card>1</Card>
          </div>
        </section>

        <section
          className="container grid h-[30rem] pb-8 pt-6 md:py-10"
          id="about-us"
        >
          <h1 className="text-3xl font-bold">Tentang Kami</h1>
        </section>
      </main>
      <footer className="container grid h-[5rem] place-items-center">
        <p className="text-sm font-semibold">
          &copy; Copyright {data.name} 2023
        </p>
      </footer>
    </>
  )
}
