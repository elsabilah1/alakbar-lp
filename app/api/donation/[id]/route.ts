import { NextResponse } from "next/server"

import connectMongo from "@/lib/db"
import Donation from "@/lib/models/Donation"
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

    const updatedDonation = await Donation.findByIdAndUpdate(params.id, body)

    return NextResponse.json(
      {
        message: "Data edited successfully.",
        data: updatedDonation,
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

    const deletedDonation = await Donation.findByIdAndDelete(params.id)

    // const orphanages = await Orphanage.find()
    // const orp = orphanages[0]
    // orp.report.totalChild -= 1

    // await Orphanage.findByIdAndUpdate(orp._id, { report: orp.report })

    return NextResponse.json(
      {
        message: "Data deleted successfully.",
        data: deletedDonation,
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}
