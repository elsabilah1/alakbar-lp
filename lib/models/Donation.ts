import mongoose, { Schema, model, models } from "mongoose"

const donationSchema = new Schema({
  donor: String,
  paymentMethod: String,
  fileUrl: String,
  fileId: String,
  createdBy: mongoose.Types.ObjectId,
})

const Donation = models.Donation || model("Donation", donationSchema)

export default Donation
