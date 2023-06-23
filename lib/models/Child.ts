import mongoose, { Schema, model, models } from "mongoose"

const childSchema = new Schema(
  {
    fullName: String,
    gender: String,
    origin: String,
    status: String,
    createdBy: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
)

const Child = models.Child || model("Child", childSchema)

export default Child
