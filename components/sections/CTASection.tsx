"use client"
import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function CTASection() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleGetQuote = () => {
    if (session) {
      router.push("/dashboard")
    } else {
      signIn("google", { callbackUrl: "/dashboard" })
    }
  }

  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    // Add your email submission logic here
    console.log("Email submitted:", email)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Thank you! We'll be in touch soon.")
      setEmail("")
    }, 1000)
  }

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent-dark text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Retirement?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Provide your email for us to reach out to you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border-2 border-neutral-gray focus:border-accent focus:outline-none bg-white text-primary placeholder:text-primary/50 px-4 py-3"
            required
          />
        </div>
      </div>
    </section>
  )
}
