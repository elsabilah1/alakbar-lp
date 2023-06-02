"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import DeleteDonationForm from "./form-delete"
import EditDonationForm from "./form-edit"

export type Donation = {
  donor: string
  paymentMethod: string
  fileUrl: string
  fileId: string
  createdBy: string
}

export const columns: ColumnDef<Donation>[] = [
  {
    accessorKey: "donor",
    header: "Donatur",
  },
  {
    accessorKey: "paymentMethod",
    header: "Metode Pembayaran",
  },
  {
    accessorKey: "fileUrl",
    header: "Bukti Pembayaran",
    cell: ({ getValue, row }) => (
      <Link href={`${getValue()}`}>{row.original.fileId}</Link>
    ),
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
        <EditDonationForm id={getValue()} />
        <DeleteDonationForm id={getValue()} />
      </div>
    ),
  },
]
