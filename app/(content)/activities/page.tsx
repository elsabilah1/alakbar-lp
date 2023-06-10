"use client"

import { Activity } from "@/store/slices/activitySlice"

import useDataList from "@/hooks/useDataList"
import { Icons } from "@/components/icons"

import ActivityCard from "./act-card"

export default function ActivitiesPage() {
  const { data, loading } = useDataList("activity", "/api/activity")

  if (loading)
    return (
      <div className="container grid h-96 place-items-center">
        <Icons.loader className="h-8 w-8 animate-spin" />
      </div>
    )

  return (
    <>
      <section className="container mb-10 pb-8 pt-6 md:py-10">
        <h1 className="mb-10 text-3xl font-bold">Kegiatan Panti</h1>
        <div className="grid gap-4 xl:grid-cols-3">
          {data.map((item: Activity) => (
            <ActivityCard key={item._id} item={item} />
          ))}
        </div>
      </section>
    </>
  )
}
