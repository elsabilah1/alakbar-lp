import { NextResponse } from "next/server"
import { genSalt, hash } from "bcrypt"

import connectMongo from "@/lib/db"
import { BadRequestError } from "@/lib/error"
import Admin from "@/lib/models/Admin"
import Orphanage from "@/lib/models/Orphanage"

export async function GET() {
  try {
    await connectMongo()
    const data = await Admin.find()
    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    await connectMongo()

    const adminExisted = await Admin.findOne({
      email: body.email,
    })

    if (adminExisted) {
      throw BadRequestError("Admin already created before.")
    }

    // hash password
    const salt = await genSalt(10)
    const hashPass = await hash(body.password, salt)
    const data = { ...body, password: hashPass }

    const createdAdmin = await Admin.create(data)

    const adminId = createdAdmin._id
    const orphanages = await Orphanage.find()
    const orp = orphanages[0]
    orp.admins.push(adminId)

    await Orphanage.findByIdAndUpdate(orp._id, { admins: orp.admins })

    return NextResponse.json(
      {
        message: "Admin created successfully.",
        data: createdAdmin,
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(error, { status: error.statusCode })
  }
}
