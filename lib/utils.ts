import crypto from "crypto"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1")
  hash.update(data)
  return hash.digest("hex")
}

export const generateSignature = ({
  folder,
  publicId,
}: {
  folder: string
  publicId: string
}) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const apiSecret = process.env.NEXT_PUBLIC_API_SECRET

  return `folder=${folder}&overwrite=true&public_id=${publicId}&timestamp=${timestamp}&upload_preset=ml_default${apiSecret}`
}

export const createUploadFile = ({
  file,
  folder,
  publicId,
}: {
  file: any
  folder: string
  publicId: string
}) => {
  const fileData = new FormData()
  const timestamp = Math.round(new Date().getTime() / 1000).toString()
  const signature = generateSHA1(generateSignature({ folder, publicId }))

  fileData.set("file", file)
  fileData.append("upload_preset", "ml_default")
  fileData.append("folder", folder)
  fileData.append("signature", signature)
  fileData.append("timestamp", timestamp)
  fileData.append("public_id", publicId)
  fileData.append("overwrite", "true")
  fileData.append("api_key", process.env.NEXT_PUBLIC_API_KEY!)

  return fileData
}
