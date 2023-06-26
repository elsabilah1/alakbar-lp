import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { mutate } from "swr"
import * as z from "zod"
import { StateCreator } from "zustand"

import { createUploadFile } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

export type Donation = {
  _id?: string
  donor: string
  paymentId: string
  paymentMethod: string
  fileUrl: string
  fileId: string
  createdBy?: string
}

export const donationSchema = z.object({
  donor: z.string().min(2).max(50),
  paymentId: z.string().min(2).max(50),
  paymentMethod: z.string().min(2).max(50),
  file: z.any(),
  fileId: z.string().optional(),
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
    paymentId: "",
    paymentMethod: "",
    fileUrl: "",
    fileId: "",
  },
  createDonation: async (values, setOpen) => {
    try {
      let uploadedFile
      const fileData = createUploadFile({
        folder: "files",
        file: values.file,
        publicId: `donation-${new Date().valueOf()}`,
      })

      try {
        const url = process.env.NEXT_PUBLIC_URL + "/image/upload"

        const { data } = await axios.post(url!, fileData)
        uploadedFile = {
          fileUrl: data.secure_url,
          fileId: data.public_id,
        }
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message })
      }

      const data = {
        ...values,
        fileUrl: uploadedFile?.fileUrl,
        fileId: uploadedFile?.fileId,
      }

      const { data: res } = await axios.post("/api/donation", data)
      toast({ description: res.message })
      mutate("donation")
      mutate("donor")
      setOpen(false)
      window.location.reload()
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
  editDonation: async (id, values, setOpen) => {
    try {
      let uploadedFile
      if (values.file) {
        const fileData = createUploadFile({
          folder: "files",
          file: values.file,
          publicId: values.fileId?.split("/")[1]!,
        })

        try {
          const url = process.env.NEXT_PUBLIC_URL + "/image/upload"

          const { data } = await axios.post(url!, fileData)
          uploadedFile = {
            fileUrl: data.secure_url,
            fileId: data.public_id,
          }
        } catch (error: any) {
          toast({ variant: "destructive", description: error.message })
        }
      }

      const data = { ...values, ...uploadedFile }
      const { data: res } = await axios.put(`/api/donation/${id}`, data)
      toast({ description: res.message })
      mutate("donation")
      mutate("donor")
      setOpen(false)
      window.location.reload()
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
  deleteDonation: async (id, setOpen, setLoading) => {
    try {
      setLoading(true)
      const { data: res } = await axios.delete(`/api/donation/${id}`)
      toast({ description: res.message })
      mutate("donation")
      mutate("donor")
      setLoading(false)
      setOpen(false)
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message })
    }
  },
})

export default createDonationSlice
