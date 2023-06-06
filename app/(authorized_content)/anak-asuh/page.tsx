"use client"

import useDataList from "@/hooks/useDataList"
import { DataTable } from "@/components/ui/data-table"

import { columns } from "./columns"
import CreateChildForm from "./form-create"

export default function AnakAsuhPage() {
  const { data, loading } = useDataList("child", "/api/child")

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-between gap-2">
        <h1 className="text-3xl font-bold">Data Anak Asuh</h1>
        <CreateChildForm />
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  )
}
