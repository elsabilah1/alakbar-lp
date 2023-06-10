"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { mutate } from "swr"
import * as z from "zod"

import { createUploadFile } from "@/lib/utils"
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
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

export const detailSchema = z.object({
  name: z.string().min(2).max(50),
  snippet: z.string().min(2).max(100),
  logo: z.any(),
  description: z.string().min(2).max(500),
  visi: z.string().min(2).max(500),
  misi: z.string().min(2).max(500),
  address: z.string().min(2).max(100),
  phoneNumber: z.string().min(2).max(50),
})

export default function EditDetailForm({ data }: { data: any }) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof detailSchema>>({
    resolver: zodResolver(detailSchema),
    defaultValues: {
      ...data,
      logo: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof detailSchema>) => {
    let uploadedLogo
    if (values.logo) {
      const fileData = createUploadFile({
        folder: "images",
        file: values.logo,
        publicId: "logo",
      })

      try {
        const url = process.env.NEXT_PUBLIC_URL + "/image/upload"

        const { data } = await axios.post(url!, fileData)
        uploadedLogo = {
          logoUrl: data.secure_url,
          logoId: data.public_id,
        }
      } catch (error) {
        console.log(error)
      }
    }

    const data = {
      ...values,
      logoUrl: uploadedLogo?.logoUrl,
      logoId: uploadedLogo?.logoId,
    }

    const { data: res } = await axios.put(`/api/orphanage`, data)
    console.log(res)

    await mutate("orphanage")
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm">
          <Icons.pen className="h-3 w-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[32rem] overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Detail Panti</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <FormField
              control={form.control}
              name="logo"
              render={({ field, formState }) => (
                <Dropzone
                  field={field}
                  formState={formState}
                  label="Logo"
                  placeholder="Unggah Logo"
                />
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Panti</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="snippet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Telp</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visi</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="misi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Misi</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
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
