import { NextResponse } from "next/server"

import connectMongo from "@/lib/db"
import Activity from "@/lib/models/Activity"
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

    const updatedActivity = await Activity.findByIdAndUpdate(params.id, body)

    return NextResponse.json(
      {
        message: "Data edited successfully.",
        data: updatedActivity,
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

    const deletedActivity = await Activity.findByIdAndDelete(params.id)

    const orphanages = await Orphanage.find()
    const orp = orphanages[0]
    orp.report.totalActivity -= 1

    await Orphanage.findByIdAndUpdate(orp._id, { report: orp.report })

    return NextResponse.json(
      {
        message: "Data deleted successfully.",
        data: deletedActivity,
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}
