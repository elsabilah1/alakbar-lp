import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import connectMongo from "@/lib/db"
import Child from "@/lib/models/Child"
import Orphanage from "@/lib/models/Orphanage"

export async function GET() {
  try {
    await connectMongo()

    const data = await Child.find()

    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()

    await connectMongo()

    // const childExisted = await Child.findOne({
    //   fullName:
    // })

    // if (childExisted) {
    //   throw BadRequestError("Data already created before.")
    // }
    const createdChild = await Child.create({
      ...body,
      createdBy: session?.user.id,
    })

    const orphanages = await Orphanage.find()
    const orp = orphanages[0]
    orp.report.totalChild += 1

    await Orphanage.findByIdAndUpdate(orp._id, { report: orp.report })

    return NextResponse.json(
      {
        message: "Data created successfully.",
        data: createdChild,
      },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}
