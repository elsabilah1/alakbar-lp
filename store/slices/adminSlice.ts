import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { mutate } from "swr"
import * as z from "zod"
import { StateCreator } from "zustand"

import { toast } from "@/components/ui/use-toast"

export type Admin = {
  _id?: string
  fullName: string
  phoneNumber: string
  email: string
  password?: string
}

export const adminSchema = z.object({
  fullName: z.string().min(2).max(50),
  phoneNumber: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(2).max(50),
})

export const editAdminSchema = z.object({
  fullName: z.string().min(2).max(50),
  phoneNumber: z.string().min(2).max(50),
  email: z.string().email(),
})

export interface IValues extends z.infer<typeof adminSchema> {}
export interface IValuesEdit extends z.infer<typeof adminSchema> {}

export interface IAdminState {
  defaultValues: Admin
  createAdmin: (
    values: IValues,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => void
  editAdmin: (
    id: unknown,
    values: IValuesEdit,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => void
  deleteAdmin: (
    id: unknown,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void
}

const createAdminSlice: StateCreator<IAdminState> = () => ({
  defaultValues: {
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  },
  createAdmin: async (values, setOpen) => {
    try {
      const { data: res } = await axios.post("/api/admin", values)
      toast({ description: res.message })
      mutate("admin")
      setOpen(false)
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
  editAdmin: async (id, values, setOpen) => {
    try {
      const { data: res } = await axios.put(`/api/admin/${id}`, values)
      toast({ description: res.message })
      mutate("admin")
      setOpen(false)
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
  deleteAdmin: async (id, setOpen, setLoading) => {
    try {
      setLoading(true)
      const { data: res } = await axios.delete(`/api/admin/${id}`)
      toast({ description: res.message })
      mutate("admin")
      setLoading(false)
      setOpen(false)
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
})

export default createAdminSlice
