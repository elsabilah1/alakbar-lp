import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { mutate } from "swr"
import * as z from "zod"
import { StateCreator } from "zustand"

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
    const { data } = await axios.post("/api/child", values)
    console.log(data)
    mutate("child")
    setOpen(false)
  },
  editChild: async (id, values, setOpen) => {
    const { data } = await axios.put(`/api/child/${id}`, values)
    console.log(data)
    mutate("child")
    setOpen(false)
  },
  deleteChild: async (id, setOpen, setLoading) => {
    setLoading(true)
    const { data } = await axios.delete(`/api/child/${id}`)
    console.log(data)
    mutate("child")
    setLoading(false)
    setOpen(false)
  },
})

export default createChildSlice
