import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/modal/connectDB";
import {Verify} from "@/modal/EmailModal";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest) {
    const { email } = await req.json()
    await connectDB()
    const key = Math.random().toString(36).substring(2, 18)
    await Verify.deleteMany({ useremail: email })
    await Verify.create({ useremail: email, key })
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!
      }
    })
    const url = `http://localhost:3000/verify/${key}`
    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to: email,
      subject: "Verify your email",
      html: `<a href="${url}">${url}</a>`
    })
    return NextResponse.json({ message: "Verification email sent" })
  }
