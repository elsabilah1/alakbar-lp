"use client"

import useDataList from "@/hooks/useDataList"
import { DataTable } from "@/components/ui/data-table"

import { columns } from "./columns"
import CreateDonationForm from "./form-create"

export default function DonasiPage() {
  const { data, loading } = useDataList("donation", "/api/donation")

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-between gap-2">
        <h1 className="text-3xl font-bold">Data Donasi</h1>
        <CreateDonationForm />
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  )
}
