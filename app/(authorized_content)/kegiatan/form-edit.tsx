"use client"

import { useState } from "react"
import { Activity, IValues, activitySchema } from "@/store/slices/activitySlice"
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

export default function EditActivityForm({ data }: { data: Activity }) {
  const { editActivity } = useStore()
  const [open, setOpen] = useState(false)

  const form = useForm<IValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: data,
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm">
          <Icons.pen className="mr-2 h-3 w-3" /> Ubah
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Data Kegiatan</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              editActivity(data._id, values, setOpen)
            )}
            className="grid gap-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field, formState }) => (
                <Dropzone
                  field={field}
                  formState={formState}
                  label="Gambar"
                  placeholder="Unggah Gambar"
                />
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
