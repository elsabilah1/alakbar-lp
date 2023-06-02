import { NextResponse } from "next/server"

import Donation from "@/lib/models/Donation"

export async function GET() {
  try {
    const data = await Donation.find()
    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}
