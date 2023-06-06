"use client"

import { Admin } from "@/store/slices/adminSlice"
import { ColumnDef } from "@tanstack/react-table"

import DeleteAdminForm from "./form-delete"
import EditAdminForm from "./form-edit"

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
    cell: ({ getValue, row }) => (
      <div className="flex gap-2">
        <EditAdminForm data={row.original} />
        <DeleteAdminForm id={getValue()} />
      </div>
    ),
  },
]
