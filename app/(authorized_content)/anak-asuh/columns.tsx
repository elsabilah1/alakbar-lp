"use client"

import { ColumnDef } from "@tanstack/react-table"

import DeleteChildForm from "./form-delete"
import EditChildForm from "./form-edit"

export type Child = {
  _id: string
  fullName: string
  gender: string
  origin: string
  status: string
}

export const columns: ColumnDef<Child>[] = [
  {
    accessorKey: "fullName",
    header: "Nama Lengkap",
  },
  {
    accessorKey: "gender",
    header: "Jenis Kelamin",
  },
  {
    accessorKey: "origin",
    header: "Asal",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "_id",
    header: "Aksi",
    cell: ({ getValue }) => (
      <div className="flex gap-2">
        <EditChildForm id={getValue()} />
        <DeleteChildForm id={getValue()} />
      </div>
    ),
  },
]
