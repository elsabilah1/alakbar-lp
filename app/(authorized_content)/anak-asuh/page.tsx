import axios from "axios"

import { DataTable } from "@/components/ui/data-table"

import { Child, columns } from "./columns"
import CreateChildForm from "./form-create"

async function getData(): Promise<Child[]> {
  const url = process.env.NEXTAUTH_URL + "/api/child"
  const { data } = await axios.get(url)
  return data.data
}

export default async function AnakAsuhPage() {
  const data = await getData()

  return (
    <div>
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Data Anak Asuh</h1>
        <CreateChildForm />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
