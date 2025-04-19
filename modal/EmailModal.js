import mongoose from "mongoose"
const verifySchema = new mongoose.Schema({
  useremail: String,
  key: String
})
export const Verify = mongoose.models.Verify || mongoose.model("Verify", verifySchema)
