"use client"

import { Activity } from "@/store/slices/activitySlice"

import useDataList from "@/hooks/useDataList"
import { Icons } from "@/components/icons"

import CardActivity from "./card-activity"
import CreateActivityForm from "./form-create"

export default function KegiatanPage() {
  const { data, loading } = useDataList("activity", "/api/activity")

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-between gap-2">
        <h1 className="text-3xl font-bold">Kelola Kegiatan</h1>
        <CreateActivityForm />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 grid h-96 place-items-center">
            <Icons.loader className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          data?.map((item: Activity, i: number) => (
            <CardActivity key={i} data={item} />
          ))
        )}
      </div>
      {!loading && data?.length === 0 && (
        <div className="grid h-24 place-items-center">
          <p>Data tidak tersedia</p>
        </div>
      )}
    </div>
  )
}
