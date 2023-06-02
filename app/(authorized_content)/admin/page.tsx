import axios from "axios"

import { DataTable } from "@/components/ui/data-table"

import { Admin, columns } from "./columns"
import CreateAdminForm from "./form-create"

async function getData(): Promise<Admin[]> {
  const url = process.env.NEXTAUTH_URL + "/api/admin"
  const { data } = await axios.get(url)
  return data.data
}

export default async function AdminPage() {
  const data = await getData()

  return (
    <div>
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Admin</h1>
        <CreateAdminForm />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
