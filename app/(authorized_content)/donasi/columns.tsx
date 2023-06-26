"use client"

import Link from "next/link"
import { Donation } from "@/store/slices/donationSlice"
import { ColumnDef } from "@tanstack/react-table"

import { buttonVariants } from "@/components/ui/button"

import DeleteDonationForm from "./form-delete"
import EditDonationForm from "./form-edit"

export const columns: ColumnDef<Donation>[] = [
  {
    accessorKey: "donor",
    header: "Donatur",
  },
  {
    accessorKey: "paymentId",
    header: "ID Pembayaran",
  },
  {
    accessorKey: "paymentMethod",
    header: "Metode Pembayaran",
  },
  {
    accessorKey: "fileUrl",
    header: "Bukti Pembayaran",
    cell: ({ getValue, row }) => (
      <Link
        target="_blank"
        href={`${getValue()}`}
        className={buttonVariants({ variant: "link" })}
      >
        link
      </Link>
    ),
  },
  {
    accessorKey: "_id",
    header: "Aksi",
    cell: ({ getValue, row }) => (
      <div className="flex gap-2">
        <EditDonationForm data={row.original} />
        <DeleteDonationForm id={getValue()} />
      </div>
    ),
  },
]
