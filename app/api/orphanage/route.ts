import { NextResponse } from "next/server"

import cloudinary from "@/lib/cloudinary"
import connectMongo from "@/lib/db"
import Orphanage from "@/lib/models/Orphanage"

export async function GET() {
  try {
    await connectMongo()
    const orphanages = await Orphanage.find()
    return NextResponse.json({ data: orphanages[0] })
  } catch (error) {
    return NextResponse.json({ error })
  }
}

export async function PUT(req: Request) {
  try {
    await connectMongo()

    const body = await req.json()

    // if (body.logo) {
    //   const logo = await cloudinary.uploader.upload(body.logo, {
    //     resource_type: "image",
    //     folder: "profile",
    //   })

    //   console.log("test", { logo })
    // }

    const orphanages = await Orphanage.find()
    const id = orphanages[0]._id

    const updatedProfile = await Orphanage.findByIdAndUpdate(id, body)

    return NextResponse.json(
      {
        message: "Data edited successfully.",
        data: updatedProfile,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error })
  }
}
