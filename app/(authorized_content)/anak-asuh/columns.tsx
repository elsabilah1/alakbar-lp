"use client"

import { Child } from "@/store/slices/childSlice"
import { ColumnDef } from "@tanstack/react-table"

import DeleteChildForm from "./form-delete"
import EditChildForm from "./form-edit"

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
    cell: ({ getValue, row }) => (
      <div className="flex gap-2">
        <EditChildForm data={row.original} />
        <DeleteChildForm id={getValue()} />
      </div>
    ),
  },
]
