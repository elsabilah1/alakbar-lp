import axios from "axios"

import { DataTable } from "@/components/ui/data-table"

import { Donation, columns } from "./columns"
import CreateDonationForm from "./form-create"

async function getData(): Promise<Donation[]> {
  const url = process.env.NEXTAUTH_URL + "/api/donation"
  const { data } = await axios.get(url)
  return data.data
}

export default async function DonasiPage() {
  const data = await getData()

  return (
    <div>
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Data Donasi</h1>
        <CreateDonationForm />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
