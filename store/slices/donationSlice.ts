import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { mutate } from "swr"
import * as z from "zod"
import { StateCreator } from "zustand"

export type Donation = {
  _id?: string
  donor: string
  paymentMethod: string
  fileUrl: string
  fileId: string
  createdBy?: string
}

export const donationSchema = z.object({
  donor: z.string().min(2).max(50),
  paymentMethod: z.string().min(2).max(50),
  fileUrl: z.string().min(2).max(50),
  fileId: z.string().min(2).max(50),
})

export interface IValues extends z.infer<typeof donationSchema> {}

export interface IDonationState {
  donationValues: Donation
  createDonation: (
    values: IValues,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => void
  editDonation: (
    id: unknown,
    values: IValues,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => void
  deleteDonation: (
    id: unknown,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void
}

const createDonationSlice: StateCreator<IDonationState> = () => ({
  donationValues: {
    donor: "",
    paymentMethod: "",
    fileUrl: "",
    fileId: "",
  },
  createDonation: async (values, setOpen) => {
    const { data } = await axios.post("/api/donation", values)
    console.log(data)
    mutate("donation")
    setOpen(false)
  },
  editDonation: async (id, values, setOpen) => {
    const { data } = await axios.put(`/api/donation/${id}`, values)
    console.log(data)
    mutate("donation")
    setOpen(false)
  },
  deleteDonation: async (id, setOpen, setLoading) => {
    setLoading(true)
    const { data } = await axios.delete(`/api/donation/${id}`)
    console.log(data)
    mutate("donation")
    setLoading(false)
    setOpen(false)
  },
})

export default createDonationSlice
