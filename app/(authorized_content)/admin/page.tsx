"use client"

import useDataList from "@/hooks/useDataList"
import { DataTable } from "@/components/ui/data-table"

import { columns } from "./columns"
import CreateAdminForm from "./form-create"

export default function AdminPage() {
  const { data, loading } = useDataList("admin", "/api/admin")

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-between gap-2">
        <h1 className="text-3xl font-bold">Kelola Admin</h1>
        <CreateAdminForm />
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  )
}
