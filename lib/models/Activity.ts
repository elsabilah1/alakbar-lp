import mongoose, { Schema, model, models } from "mongoose"

const activitySchema = new Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    imageId: String,
    createdBy: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
)

const Activity = models.Activity || model("Activity", activitySchema)

export default Activity
