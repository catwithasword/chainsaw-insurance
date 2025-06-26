"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import type React from "react"

export default function HeroSection() {
  const { data: session } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentAge: "",
    retirementAge: "",
    initialInvestment: "",
    monthlyContribution: "",
  })

  const handleExploreAnnuities = () => {
    if (session) {
      router.push("/dashboard")
    } else {
      signIn("google", { callbackUrl: "/dashboard" })
    }
  }

  const handleCalculateReturns = () => {
    if (session) {
      router.push("/dashboard")
    } else {
      signIn("google", { callbackUrl: "/dashboard" })
    }
  }

  // Function to handle numeric input only
  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value
    // Allow only numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, "")

    // Prevent multiple decimal points
    const parts = numericValue.split(".")
    const finalValue = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericValue

    setFormData((prev) => ({
      ...prev,
      [field]: finalValue,
    }))
  }

  // Function to handle key press (prevent non-numeric characters)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ]
    const isNumber = /[0-9]/.test(e.key)
    const isDecimal = e.key === "."

    if (!isNumber && !isDecimal && !allowedKeys.includes(e.key)) {
      e.preventDefault()
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", formData)
    // Handle form submission here
    if (session) {
      router.push("/dashboard")
    } else {
      signIn("google", { callbackUrl: "/dashboard" })
    }
  }

  return (
    <section className="bg-gradient-to-br from-primary via-accent-dark to-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-6 bg-accent text-accent-foreground">Retirement • Security • Growth</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Own Your Future with <span className="text-accent">High-Yield, Blockchain-Based Annuities</span>
            </h1>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              Earn more. Own more. The first blockchain-based annuity protocol that gives you higher yield, full transparency, and global access — governed by the people.
            </p>            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4"
                onClick={handleExploreAnnuities}
              >
                {session ? "View Dashboard" : "Explore Annuities"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4"
                onClick={handleCalculateReturns}
              >
                Calculate Returns
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">$5.2B+</div>
                <div className="text-sm opacity-80">Assets Under Management</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">25,000+</div>
                <div className="text-sm opacity-80">Annuity Holders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">8.5%</div>
                <div className="text-sm opacity-80">Average Annual Return</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-gray">
              <h3 className="text-2xl font-bold text-primary mb-6">Annuity Calculator</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Your Age"
                    value={formData.currentAge}
                    onChange={(e) => handleNumericInput(e, "currentAge")}
                    onKeyDown={handleKeyPress}
                    min="0"
                    max="200"
                    className="border-2 border-neutral-gray focus:border-accent bg-white text-primary placeholder:text-primary/50"
                  />
                  <Input
                    type="number"
                    placeholder="Retirement Age (number)"
                    value={formData.retirementAge}
                    onChange={(e) => handleNumericInput(e, "retirementAge")}
                    onKeyDown={handleKeyPress}
                    min="0"
                    max="200"
                    className="border-2 border-neutral-gray focus:border-accent bg-white text-primary placeholder:text-primary/50"
                  />
                </div>
                <Input
                  type="number"
                  placeholder="Initial Investment ($)"
                  value={formData.initialInvestment}
                  onChange={(e) => handleNumericInput(e, "initialInvestment")}
                  onKeyDown={handleKeyPress}
                  className="border-2 border-neutral-gray focus:border-accent bg-white text-primary placeholder:text-primary/50"
                />
                <Input
                  type="number"
                  placeholder="Monthly Contribution ($)"
                  value={formData.monthlyContribution}
                  onChange={(e) => handleNumericInput(e, "monthlyContribution")}
                  onKeyDown={handleKeyPress}
                  className="border-2 border-neutral-gray focus:border-accent bg-white text-primary placeholder:text-primary/50"
                />
                <select className="w-full px-3 py-2 border-2 border-neutral-gray rounded-md bg-white text-primary focus:border-accent focus:outline-none">
                  <option value="">Annuity Type</option>
                  <option value="fixed">Fixed Annuity</option>
                  <option value="variable">Variable Annuity</option>
                  <option value="indexed">Indexed Annuity</option>
                  <option value="immediate">Immediate Annuity</option>
                </select>                
                <Button 
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3"
                >
                  {session ? "View My Dashboard" : "Calculate My Returns"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
