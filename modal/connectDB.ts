import mongoose from "mongoose"
const connection: { isConnected?: number } = {}
export const connectDB = async () => {
  if (connection.isConnected) return
  const db = await mongoose.connect("mongodb+srv://Godara:Godara2899@planproject.m6cook1.mongodb.net/")
  connection.isConnected = db.connections[0].readyState
}
