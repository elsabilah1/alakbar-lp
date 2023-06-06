import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import connectMongo from "@/lib/db"
import Donation from "@/lib/models/Donation"

export async function GET() {
  try {
    await connectMongo()

    const data = await Donation.find()
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

    const createdDonation = await Donation.create({
      ...body,
      createdBy: session?.user.id,
    })

    // const orphanages = await Orphanage.find()
    // const orp = orphanages[0]
    // orp.report.totalDonor += 1

    // await Orphanage.findByIdAndUpdate(orp._id, { report: orp.report })

    return NextResponse.json(
      {
        message: "Data created successfully.",
        data: createdDonation,
      },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}
