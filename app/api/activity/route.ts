import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import connectMongo from "@/lib/db"
import Activity from "@/lib/models/Activity"
import Admin from "@/lib/models/Admin"
import Orphanage from "@/lib/models/Orphanage"

export async function GET() {
  try {
    await connectMongo()
    const admins = await Admin.find()
    const activities = await Activity.find()
    const data = activities.map(({ _doc: item }) => {
      const createdBy =
        admins.find(
          ({ _doc: user }) => user._id.toString() === item.createdBy.toString()
        )?.fullName ?? item.createdBy

      return {
        ...item,
        createdBy,
      }
    })
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

    const createdActivity = await Activity.create({
      ...body,
      createdBy: session?.user.id,
    })

    const orphanages = await Orphanage.find()
    const orp = orphanages[0]
    orp.report.totalActivity += 1

    await Orphanage.findByIdAndUpdate(orp._id, { report: orp.report })

    return NextResponse.json(
      {
        message: "Data created successfully.",
        data: createdActivity,
      },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}
