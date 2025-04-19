import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/modal/connectDB";
import { Verify } from "@/modal/EmailModal";
export async function POST(req: NextRequest) {
  const { key } = await req.json()
  await connectDB()
  const match = await Verify.findOne({ key })
  if (!match) return NextResponse.json({ message: "Invalid or expired link" })
  return NextResponse.json({ message: `Welcome back ${match.useremail}` })
}
