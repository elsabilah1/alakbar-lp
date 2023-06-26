import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { mutate } from "swr"
import * as z from "zod"
import { StateCreator } from "zustand"

import { createUploadFile } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

export type Activity = {
  _id?: string
  title: string
  description: string
  imageUrl: string
  imageId: string
  createdBy?: string
}

export const activitySchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(2).max(500),
  image: z.any(),
  imageId: z.string().optional(),
})

export interface IValues extends z.infer<typeof activitySchema> {}

export interface IActivityState {
  activityValues: Activity
  createActivity: (
    values: IValues,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => void
  editActivity: (
    id: unknown,
    values: IValues,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => void
  deleteActivity: (
    id: unknown,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void
}

const createActivitySlice: StateCreator<IActivityState> = () => ({
  activityValues: {
    title: "",
    description: "",
    imageUrl: "",
    imageId: "",
  },
  createActivity: async (values, setOpen) => {
    try {
      let uploadedImage
      const fileData = createUploadFile({
        folder: "images",
        file: values.image,
        publicId: `activity-${new Date().valueOf()}`,
      })

      try {
        const url = process.env.NEXT_PUBLIC_URL + "/image/upload"

        const { data } = await axios.post(url!, fileData)
        uploadedImage = {
          imageUrl: data.secure_url,
          imageId: data.public_id,
        }
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message })
      }

      const data = {
        ...values,
        imageUrl: uploadedImage?.imageUrl,
        imageId: uploadedImage?.imageId,
      }

      const { data: res } = await axios.post("/api/activity", data)
      toast({ description: res.message })
      mutate("activity")
      setOpen(false)
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
  editActivity: async (id, values, setOpen) => {
    try {
      let uploadedImage

      const fileData = createUploadFile({
        folder: "images",
        file: values.image,
        publicId: values.imageId?.split("/")[1]!,
      })

      try {
        const url = process.env.NEXT_PUBLIC_URL + "/image/upload"

        const { data } = await axios.post(url!, fileData)

        uploadedImage = {
          imageUrl: data.secure_url,
          imageId: data.public_id,
        }
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message })
      }

      const data = {
        ...values,
        imageUrl: uploadedImage?.imageUrl,
        imageId: uploadedImage?.imageId,
      }

      const { data: res } = await axios.put(`/api/activity/${id}`, data)
      toast({ description: res.message })
      mutate("activity")
      setOpen(false)
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
  deleteActivity: async (id, setOpen, setLoading) => {
    try {
      setLoading(true)
      const { data: res } = await axios.delete(`/api/activity/${id}`)
      toast({ description: res.message })
      mutate("activity")
      setLoading(false)
      setOpen(false)
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
})

export default createActivitySlice
