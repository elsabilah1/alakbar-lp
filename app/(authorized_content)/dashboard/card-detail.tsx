"use client"

import Image from "next/image"
import { IValues } from "@/store/slices/profileSlice"
import { useForm } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import EditDetailForm from "./form-edit"

export default function CardDetail({ data }: { data: any }) {
  const form = useForm<IValues>({
    defaultValues: {
      ...data,
      email: data.links.socials.email,
      instagram: data.links.socials.instagram,
      facebook: data.links.socials.facebook,
      donation: data.links.donation,
    },
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Detail Panti</CardTitle>
          <EditDetailForm data={data} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => console.log("clicked"))}
            className="grid gap-10"
          >
            <div className="grid gap-3 md:grid-cols-4 md:gap-10">
              <FormField
                control={form.control}
                name="logo"
                render={() => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <div className="grid h-36 place-items-center border">
                        <Image
                          src={data.images.logo.url}
                          alt="logo"
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hero"
                render={() => (
                  <FormItem>
                    <FormLabel>Hero</FormLabel>
                    <FormControl>
                      <div className="relative h-36 w-full border">
                        <Image
                          src={data.images.hero.url}
                          alt="hero"
                          className="object-contain object-center p-1"
                          fill
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={() => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <div className="relative h-36 w-full border">
                        <Image
                          src={data.images.about.url}
                          alt="about"
                          className="object-contain object-center p-1"
                          fill
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="footer"
                render={() => (
                  <FormItem>
                    <FormLabel>Footer</FormLabel>
                    <FormControl>
                      <div className="relative h-36 w-full border">
                        <Image
                          src={data.images.footer.url}
                          alt="footer"
                          className="object-contain object-center p-1"
                          fill
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Panti</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
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
                  <FormLabel>Kutipan</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
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
                    <Input {...field} readOnly />
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
                    <Textarea {...field} readOnly />
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
                    <Textarea {...field} readOnly />
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
                    <Textarea {...field} readOnly />
                  </FormControl>
                  <FormDescription>
                    Tanda &quot;%&quot; sebagai pemisah antar poin.
                  </FormDescription>
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
                    <Textarea {...field} readOnly />
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
                    <Input {...field} readOnly />
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
                    <Input {...field} readOnly />
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
                    <Input {...field} readOnly />
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
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
