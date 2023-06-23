"use client"

import { useState } from "react"
import { IValues, detailSchema } from "@/store/slices/profileSlice"
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
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

export default function EditDetailForm({ data }: { data: any }) {
  const [open, setOpen] = useState(false)
  const { editProfile } = useStore()

  const form = useForm<IValues>({
    resolver: zodResolver(detailSchema),
    defaultValues: {
      ...data,
      email: data.links.socials.email,
      instagram: data.links.socials.instagram,
      facebook: data.links.socials.facebook,
      donation: data.links.donation,
      logo: "",
      hero: "",
      about: "",
      footer: "",
    },
  })

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
          <form
            onSubmit={form.handleSubmit((values) =>
              editProfile(data, values, setOpen)
            )}
            className="grid gap-3"
          >
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
              name="hero"
              render={({ field, formState }) => (
                <Dropzone
                  field={field}
                  formState={formState}
                  label="Hero"
                  placeholder="Unggah Gambar Hero"
                />
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field, formState }) => (
                <Dropzone
                  field={field}
                  formState={formState}
                  label="About"
                  placeholder="Unggah Gambar About"
                />
              )}
            />
            <FormField
              control={form.control}
              name="footer"
              render={({ field, formState }) => (
                <Dropzone
                  field={field}
                  formState={formState}
                  label="Footer"
                  placeholder="Unggah Gambar Footer"
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Instagram</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Facebook</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="donation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Donasi</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
