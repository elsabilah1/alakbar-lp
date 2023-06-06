import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { mutate } from "swr"
import * as z from "zod"
import { StateCreator } from "zustand"

export type Activity = {
  _id?: string
  title: string
  description: string
  imageUrl: string
  imageId: string
}

export const activitySchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(200),
  imageUrl: z.string().min(2).max(50),
  imageId: z.string().min(2).max(50),
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
    const { data } = await axios.post("/api/activity", values)
    console.log(data)
    mutate("activity")
    setOpen(false)
  },
  editActivity: async (id, values, setOpen) => {
    const { data } = await axios.put(`/api/activity/${id}`, values)
    console.log(data)
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
