import { Schema, model, models } from "mongoose"

const adminSchema = new Schema(
  {
    fullName: String,
    phoneNumber: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
)

const Admin = models.Admin || model("Admin", adminSchema)

export default Admin
