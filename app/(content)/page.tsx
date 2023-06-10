"use client"

import Link from "next/link"
import { Activity } from "@/store/slices/activitySlice"
import { Link2 } from "lucide-react"

import useDataList from "@/hooks/useDataList"
import { Icons } from "@/components/icons"

import About from "./about"
import ActivityCard from "./activities/act-card"
import CardTotal from "./card-total"
import Hero from "./hero"

export default function HomePage() {
  const { data, loading } = useDataList("activity", "/api/activity")

  return (
    <>
      <Hero />
      <div className="relative">
        <CardTotal />
      </div>
      <section className="container bg-emerald-800 pb-8 pt-6 md:pb-10 md:pt-36">
        <div className="mb-10 flex items-center gap-2 text-emerald-50">
          <h1 className="text-3xl font-bold">Kegiatan Panti</h1>
          <Link href="/activities">
            <Link2 />
          </Link>
        </div>

        {loading ? (
          <div className="grid h-96 place-items-center">
            <Icons.loader className="h-8 w-8 animate-spin" />
          </div>
        ) : data?.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {data.slice(0, 3).map((item: Activity) => (
              <ActivityCard item={item} key={item._id} />
            ))}
          </div>
        ) : (
          <div>empty list</div>
        )}
      </section>
      <About />
    </>
  )
}
