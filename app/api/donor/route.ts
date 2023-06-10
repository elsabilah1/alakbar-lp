import { NextResponse } from "next/server"

import connectMongo from "@/lib/db"
import Donor from "@/lib/models/Donor"

export async function GET() {
  try {
    await connectMongo()

    const data = await Donor.find()
    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}
