"use client"

import { useState } from "react"
import { IValues, donationSchema } from "@/store/slices/donationSlice"
import useStore from "@/store/useStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Dropzone from "@/components/ui/dropzone"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

import DonorCombobox from "./donor-combobox"

export default function CreateDonationForm() {
  const { donationValues, createDonation } = useStore()
  const [open, setOpen] = useState(false)

  const form = useForm<IValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: donationValues,
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>
          <Icons.plus className="h-3 w-3" /> Tambah Data
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tambah Data Donasi</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              await createDonation(values, setOpen)
              form.reset()
            })}
            className="grid gap-3"
          >
            <FormField
              control={form.control}
              name="donor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donatur</FormLabel>
                  <FormControl>
                    <DonorCombobox field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metode Pembayaran</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field, formState }) => (
                <Dropzone
                  field={field}
                  formState={formState}
                  label="Bukti Pembayaran"
                  placeholder="Unggah file bukti pembayaran"
                />
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => form.reset()}
                disabled={form.formState.isSubmitting}
              >
                Batal
              </AlertDialogCancel>
              <Button type="submit" isLoading={form.formState.isSubmitting}>
                Simpan
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
