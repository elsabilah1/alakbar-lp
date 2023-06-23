import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { mutate } from "swr"
import * as z from "zod"
import { StateCreator } from "zustand"

import { createUploadFile } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

export const detailSchema = z.object({
  name: z.string().min(2).max(50),
  snippet: z.string().min(2).max(100),
  description: z.string().min(2).max(500),
  visi: z.string().min(2).max(500),
  misi: z.string().min(2).max(500),
  address: z.string().min(2).max(100),
  phoneNumber: z.string().min(2).max(50),
  // images
  logo: z.any(),
  hero: z.any(),
  about: z.any(),
  footer: z.any(),
  // links
  email: z.string().min(2).max(50),
  instagram: z.string().min(2).max(50),
  facebook: z.string().min(2).max(50),
  donation: z.string().min(2).max(50),
})

export interface IValues extends z.infer<typeof detailSchema> {
  [index: string]: any
}

interface IProps {
  values: IValues
  key: string
}

async function uploadImage({ values, key }: IProps) {
  try {
    const fileData = createUploadFile({
      folder: "images",
      file: values[key],
      publicId: key,
    })

    const url = process.env.NEXT_PUBLIC_URL + "/image/upload"

    const { data } = await axios.post(url!, fileData)

    return {
      url: data.secure_url,
      id: data.public_id,
    }
  } catch (error: any) {
    toast({ variant: "destructive", description: error.message })
  }
}

export interface IProfileState {
  editProfile: (
    data: any,
    values: IValues,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => void
}

const createProfileSlice: StateCreator<IProfileState> = () => ({
  editProfile: async (data, values, setOpen) => {
    try {
      let images: any = {
        logo: { url: data.images.logo.url, id: data.images.logo.id },
        hero: { url: data.images.hero.url, id: data.images.hero.id },
        about: { url: data.images.about.url, id: data.images.about.id },
        footer: { url: data.images.footer.url, id: data.images.footer.id },
      }

      if (values.logo) {
        images.logo = await uploadImage({ values, key: "logo" })
      }
      if (values.hero) {
        images.hero = await uploadImage({ values, key: "hero" })
      }
      if (values.about) {
        images.about = await uploadImage({ values, key: "about" })
      }
      if (values.footer) {
        images.footer = await uploadImage({ values, key: "footer" })
      }

      const formData = {
        ...values,
        images,
        links: {
          socials: {
            email: values.email,
            instagram: values.instagram,
            facebook: values.facebook,
          },
          donation: values.donation,
        },
      }

      const { data: res } = await axios.put(`/api/orphanage`, formData)
      toast({ description: res.message })
      await mutate("orphanage")
      setOpen(false)
      // window.location.reload()
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
})

export default createProfileSlice
