"use client"
import { useEffect } from "react"
import { useParams } from "next/navigation"
import { toast } from "sonner"
export default function VerifyPage() {
  const { id } = useParams()
  useEffect(() => {
    const verify = async () => {
      const res = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({ key: id }),
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json()
      toast(data.message)
    }
    verify()
  }, [id])
  return <div className="min-h-screen flex items-center justify-center text-xl font-medium">Verifying...</div>
}
