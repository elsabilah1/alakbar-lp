import { NextResponse } from "next/server"
import { Donation as DonationType } from "@/store/slices/donationSlice"

import cloudinary from "@/lib/cloudinary"
import connectMongo from "@/lib/db"
import { BadRequestError } from "@/lib/error"
import Donation from "@/lib/models/Donation"
import Donor from "@/lib/models/Donor"
import Orphanage from "@/lib/models/Orphanage"

export async function PUT(req: Request, { params }: any) {
  try {
    const body: DonationType = await req.json()

    await connectMongo()

    const donation = await Donation.findById(params.id)

    if (!donation) {
      throw BadRequestError("Data with this id not found.")
    }

    let updatedDonation
    if (donation.donor !== body.donor) {
      const temp = await Donor.findOne({ name: donation.donor })

      if (temp.donations.length === 1) {
        await Donor.findByIdAndDelete(temp._id)

        const orphanages = await Orphanage.find()
        const orp = orphanages[0]
        orp.report.totalDonor -= 1

        await Orphanage.findByIdAndUpdate(orp._id, { report: orp.report })
      } else {
        await Donor.findOneAndUpdate(
          { name: donation.donor },
          {
            donations: temp.donations.filter(
              (item: any) => !item.toString().includes(donation._id)
            ),
          }
        )
      }

      updatedDonation = await Donation.findByIdAndUpdate(params.id, body)

      // check if new donor already saved
      const donor = await Donor.findOne({ name: body.donor })

      if (!donor) {
        await Donor.create({
          name: body.donor,
          donations: [updatedDonation._id],
        })

        const orphanages = await Orphanage.find()
        const orp = orphanages[0]
        orp.report.totalDonor += 1

        await Orphanage.findByIdAndUpdate(orp._id, { report: orp.report })
      } else {
        donor.donations.push(updatedDonation._id)
        await Donor.findByIdAndUpdate(donor._id, { donations: donor.donations })
      }
    } else {
      updatedDonation = await Donation.findByIdAndUpdate(params.id, body)
    }

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

    await cloudinary.uploader.destroy(deletedDonation.fileId)

    const donor = await Donor.findOne({ name: deletedDonation.donor })

    if (donor.donations.length === 1) {
      await Donor.findByIdAndDelete(donor._id)

      const orphanages = await Orphanage.find()
      const orp = orphanages[0]
      orp.report.totalDonor -= 1

      await Orphanage.findByIdAndUpdate(orp._id, { report: orp.report })
    } else {
      await Donor.findByIdAndUpdate(donor._id, {
        donations: donor.donations.filter(
          (item: any) => !item.toString().includes(deletedDonation._id)
        ),
      })
    }

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
