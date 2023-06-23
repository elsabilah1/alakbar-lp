"use client"

import Link from "next/link"

import useDataList from "@/hooks/useDataList"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function Hero() {
  const { data, loading } = useDataList("detail", "/api/orphanage")

  if (loading)
    return (
      <div className="container grid h-96 place-items-center">
        <Icons.loader className="h-8 w-8 animate-spin" />
      </div>
    )

  return (
    <section className="container relative grid h-screen bg-emerald-200 text-emerald-100 md:h-[calc(100vh-100px)] md:grid-cols-3 lg:grid-cols-2">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-800 to-transparent"></div>
      <div className="z-20 grid items-center md:col-span-2 lg:col-auto">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Panti Asuhan {data.name} Pekanbaru
          </h1>
          <p className="w-2/3">{data.snippet}</p>
          <Link
            target="_blank"
            href={data.links.donation}
            className={buttonVariants({ size: "lg", variant: "secondary" })}
          >
            <span className="font-bold">MULAI DONASI</span>{" "}
            <Icons.arrowRight className="ml-3 h-4 w-4" />
          </Link>
        </div>
      </div>
      {data && (
        <div
          style={{ backgroundImage: `url(${data.images.hero.url})` }}
          className="absolute right-0 top-1/2 h-[28rem] w-3/4 -translate-y-1/2 rounded-l-full bg-cover lg:w-1/2"
        ></div>
      )}
    </section>
  )
}
