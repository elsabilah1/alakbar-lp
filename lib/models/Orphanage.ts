import mongoose, { Schema, model, models } from "mongoose"

const orphanageSchema = new Schema(
  {
    name: String,
    snippet: String,
    description: String,
    visi: String,
    misi: String,
    address: String,
    phoneNumber: String,
    report: {
      totalActivity: { type: Number, default: 0 },
      totalChild: { type: Number, default: 0 },
      totalDonor: { type: Number, default: 0 },
    },
    images: {
      logo: { url: String, id: String },
      hero: { url: String, id: String },
      about: { url: String, id: String },
      footer: { url: String, id: String },
    },
    links: {
      socials: { email: String, instagram: String, facebook: String },
      donation: String,
    },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
  },
  {
    timestamps: true,
  }
)

const Orphanage = models.Orphanage || model("Orphanage", orphanageSchema)

export default Orphanage
