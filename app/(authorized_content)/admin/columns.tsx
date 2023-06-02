"use client"

import { ColumnDef } from "@tanstack/react-table"

import DeleteAdminForm from "./form-delete"
import EditAdminForm from "./form-edit"

export type Admin = {
  _id: string
  fullName: string
  phoneNumber: string
  email: string
}

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "fullName",
    header: "Nama Lengkap",
  },
  {
    accessorKey: "phoneNumber",
    header: "No. Telp",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "_id",
    header: "Aksi",
    cell: ({ getValue }) => (
      <div className="flex gap-2">
        <EditAdminForm id={getValue()} />
        <DeleteAdminForm id={getValue()} />
      </div>
    ),
  },
]
