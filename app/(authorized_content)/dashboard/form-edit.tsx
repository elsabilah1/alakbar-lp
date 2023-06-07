"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { mutate } from "swr"
import * as z from "zod"

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

export const detailSchema = z.object({
  name: z.string().min(2).max(50),
  snippet: z.string().min(2).max(50),
  logo: z.any(),
  logoUrl: z.string().min(2).max(50),
  logoId: z.string().min(2).max(50),
  description: z.string().min(2).max(200),
  visi: z.string().min(2).max(50),
  misi: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
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
    // console.log({ values })
    const data = new FormData()
    // data.append('logo',values.logo)
    for (const key in values) {
      data.append(key, values[key])
    }

    const { data: res } = await axios.put(`/api/orphanage`, data)
    console.log(res)
    // mutate("orphanage")
    // setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm">
          <Icons.pen className="h-3 w-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-96 overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Detail Panti</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
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
              name="logo"
              render={({ field, formState }) => {
                const { getRootProps, getInputProps } = useDropzone({
                  maxFiles: 1,
                  accept: {
                    "image/*": [".jpeg", ".png"],
                  },
                  onDrop: (acceptedFiles) => {
                    field.onChange(acceptedFiles[0])
                  },
                })

                return (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <>
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input
                            {...getInputProps()}
                            name={field.name}
                            disabled={formState.isSubmitting}
                          />
                          <div className="flex h-16 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed md:gap-6">
                            <span className="text-sm font-medium">
                              Unggah Logo
                            </span>
                          </div>
                        </div>
                        <div>
                          {field.value && (
                            <div className="my-2 flex justify-between border border-emerald-500 p-2">
                              <p className="text-sm">{field.value.path}</p>
                              <button onClick={() => field.onChange(undefined)}>
                                <Icons.x className="w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
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
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Url</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Id</FormLabel>
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => form.reset()}>
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
