import { NextResponse } from "next/server"

import connectMongo from "@/lib/db"
import Orphanage from "@/lib/models/Orphanage"

export async function GET() {
  try {
    await connectMongo()
    const orphanage = await Orphanage.find()
    return NextResponse.json({ orphanage })
  } catch (error) {
    return NextResponse.json({ error })
  }
}

export async function POST() {
  try {
    await connectMongo()

    const createdProfile = await Orphanage.create({
      name: "alakbar",
      snippet:
        "snippet Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia veritatis inventore expedita, sint dolorem facilis perspiciatis nostrum est eveniet veniam, nobis reiciendis beatae tenetur doloremque et praesentium ipsam temporibus! Distinctio?",
      logoUrl: "logoUrl",
      logoId: "logoId",
      description:
        "desc Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia veritatis inventore expedita, sint dolorem facilis perspiciatis nostrum est eveniet veniam, nobis reiciendis beatae tenetur doloremque et praesentium ipsam temporibus! Distinctio?",
      misi: "visi",
      visi: "misi",
      address: "address",
      phoneNumber: "08999999999",
    })

    return NextResponse.json({ createdProfile })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
