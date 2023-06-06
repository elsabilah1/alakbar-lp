import { NextResponse } from "next/server"

import connectMongo from "@/lib/db"
import Admin from "@/lib/models/Admin"
import Orphanage from "@/lib/models/Orphanage"

export async function PUT(req: Request, { params }: any) {
  try {
    const body = await req.json()

    await connectMongo()

    // const childExisted = await Child.findOne({
    //   fullName:
    // })

    // if (childExisted) {
    //   throw BadRequestError("Data already created before.")
    // }

    const updatedAdmin = await Admin.findByIdAndUpdate(params.id, body)

    return NextResponse.json(
      {
        message: "Data edited successfully.",
        data: updatedAdmin,
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}

export async function DELETE(req: Request, { params }: any) {
  try {
    await connectMongo()

    const deletedAdmin = await Admin.findByIdAndDelete(params.id)

    const adminId = deletedAdmin._id
    const orphanages = await Orphanage.find()
    const orp = orphanages[0]
    orp.admins.filter((item: string) => item != adminId)

    await Orphanage.findByIdAndUpdate(orp._id, { admins: orp.admins })

    return NextResponse.json(
      {
        message: "Data deleted successfully.",
        data: deletedAdmin,
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}
