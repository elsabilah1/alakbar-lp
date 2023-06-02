import mongoose, { Schema, model, models } from "mongoose"

const orphanageSchema = new Schema({
  name: String,
  snippet: String,
  logoUrl: String,
  logoId: String,
  description: String,
  visi: String,
  misi: String,
  address: String,
  phoneNumber: String,
  report: {
    totalActivity: {
      type: Number,
      default: 0,
    },
    totalChild: {
      type: Number,
      default: 0,
    },
    totalDonor: {
      type: Number,
      default: 0,
    },
  },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
})

const Orphanage = models.Orphanage || model("Orphanage", orphanageSchema)

export default Orphanage
