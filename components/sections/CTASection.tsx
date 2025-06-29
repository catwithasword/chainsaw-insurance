"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function EmailCTASection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Email submitted:", email)
    setIsSubmitting(false)
    setEmail("")
  }

  const handleIconClick = () => {
    if (email) {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent-dark text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Retirement?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">Provide your email for us to reach out to you.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-neutral-gray focus:border-accent focus:outline-none bg-white text-primary placeholder:text-primary/50 px-4 py-3 pr-12"
              required
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={handleIconClick}
              disabled={!email || isSubmitting}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all duration-200 hover:bg-primary/10 hover:scale-110 active:scale-95 ${
                !email || isSubmitting ? "opacity-70 cursor-default" : "cursor-pointer hover:cursor-pointer"
              }`}
            >
              <Send
                className={`h-5 w-5 transition-all duration-200 ${
                  email && !isSubmitting ? "text-primary hover:text-accent" : "text-primary/50"
                } ${isSubmitting ? "animate-pulse" : ""}`}
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

