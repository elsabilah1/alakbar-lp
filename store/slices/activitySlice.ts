import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { mutate } from "swr"
import * as z from "zod"
import { StateCreator } from "zustand"

import { createUploadFile } from "@/lib/utils"

export type Activity = {
  _id?: string
  title: string
  description: string
  imageUrl: string
  imageId: string
}

export const activitySchema = z.object({
  title: z.string().min(2).max(50),
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
    } catch (error) {
      console.log(error)
    }

    const data = {
      ...values,
      imageUrl: uploadedImage?.imageUrl,
      imageId: uploadedImage?.imageId,
    }

    const { data: res } = await axios.post("/api/activity", data)

    console.log(res)
    mutate("activity")
    setOpen(false)
  },
  editActivity: async (id, values, setOpen) => {
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
    } catch (error) {
      console.log(error)
    }

    const data = {
      ...values,
      imageUrl: uploadedImage?.imageUrl,
      imageId: uploadedImage?.imageId,
    }

    const { data: res } = await axios.put(`/api/activity/${id}`, data)
    console.log(res)
    mutate("activity")
    setOpen(false)
  },
  deleteActivity: async (id, setOpen, setLoading) => {
    setLoading(true)
    const { data } = await axios.delete(`/api/activity/${id}`)
    console.log(data)
    mutate("activity")
    setLoading(false)
    setOpen(false)
  },
})

export default createActivitySlice
