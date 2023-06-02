import mongoose, { Schema, model, models } from "mongoose"

const childSchema = new Schema({
  fullName: String,
  gender: String,
  origin: String,
  status: String,
  createdBy: mongoose.Types.ObjectId,
})

const Child = models.Child || model("Child", childSchema)

export default Child
