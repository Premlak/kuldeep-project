"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      toast(data.message);
    } catch (error) {
      toast("Error sending email.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col justify-center items-center  sm:items-start">
        <h1 className="text-2xl font-semibold text-center sm:text-left mb-8">
          How Cloud Computing Works
        </h1>
        <p className="text-center sm:text-left text-lg mb-4">
          Cloud computing allows us to store and process data on remote servers. One of its key features is the ability to provide services like password recovery across various platforms. When you forget your password on a service, cloud computing helps to redirect you to a password recovery page.
        </p>
        <div className="flex flex-col gap-6 items-center sm:items-start">
          <p className="text-center sm:text-left text-lg">
            Enter your email below, and we’ll guide you through the recovery process:
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-96"
            />
            <Button
              type="submit"
              className="w-full sm:w-auto h-12 bg-primary cursor-pointer text-white font-semibold rounded-full hover:bg-primary-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
