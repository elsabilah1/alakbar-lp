import { NextResponse } from "next/server"

import Child from "@/lib/models/Child"

export async function GET() {
  try {
    const data = await Child.find()
    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}
