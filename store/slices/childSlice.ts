import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { mutate } from "swr"
import * as z from "zod"
import { StateCreator } from "zustand"

import { toast } from "@/components/ui/use-toast"

export type Child = {
  _id?: string
  fullName: string
  gender: string
  origin: string
  status: string
}

export const childSchema = z.object({
  fullName: z.string().min(2).max(50),
  gender: z.string().min(2).max(50),
  origin: z.string().min(2).max(50),
  status: z.string().min(2).max(50),
})

export interface IValues extends z.infer<typeof childSchema> {}

export interface IChildState {
  childValues: Child
  createChild: (
    values: IValues,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => void
  editChild: (
    id: unknown,
    values: IValues,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => void
  deleteChild: (
    id: unknown,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void
}

const createChildSlice: StateCreator<IChildState> = () => ({
  childValues: {
    fullName: "",
    gender: "",
    origin: "",
    status: "",
  },
  createChild: async (values, setOpen) => {
    try {
      const { data: res } = await axios.post("/api/child", values)
      toast({ description: res.message })
      mutate("child")
      setOpen(false)
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
  editChild: async (id, values, setOpen) => {
    try {
      const { data: res } = await axios.put(`/api/child/${id}`, values)
      toast({ description: res.message })
      mutate("child")
      setOpen(false)
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
  deleteChild: async (id, setOpen, setLoading) => {
    try {
      setLoading(true)
      const { data: res } = await axios.delete(`/api/child/${id}`)
      toast({ description: res.message })
      mutate("child")
      setLoading(false)
      setOpen(false)
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
})

export default createChildSlice
