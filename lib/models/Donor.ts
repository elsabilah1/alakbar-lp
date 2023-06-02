import mongoose, { Schema, model, models } from "mongoose"

const donorSchema = new Schema({
  name: String,
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
})

const Donor = models.Donor || model("Donor", donorSchema)

export default Donor
