"use client"

import { useState } from "react"
import { Donation, IValues, donationSchema } from "@/store/slices/donationSlice"
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

export default function EditDonationForm({ data }: { data: Donation }) {
  const { editDonation } = useStore()
  const [open, setOpen] = useState(false)

  const form = useForm<IValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: data,
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm">
          <Icons.pen className="h-3 w-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Data Donasi</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            className="grid gap-3"
            onSubmit={form.handleSubmit(async (values) => {
              await editDonation(data._id, values, setOpen)
              form.reset()
            })}
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
