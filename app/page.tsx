"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type React from "react"

import { useState } from "react"
import {
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Calculator,
  PiggyBank,
  Banknote,
} from "lucide-react"

export default function ChainsawAnnuityPage() {
  const [formData, setFormData] = useState({
    currentAge: "",
    retirementAge: "",
    initialInvestment: "",
    monthlyContribution: "",
  })
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
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-neutral-gray">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-primary">Chainsaw</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#products" className="text-primary hover:text-accent transition-colors font-medium">
              Annuity Plans
            </a>
            <a href="#calculator" className="text-primary hover:text-accent transition-colors font-medium">
              Calculator
            </a>
            <a href="#benefits" className="text-primary hover:text-accent transition-colors font-medium">
              Benefits
            </a>
            <a href="#testimonials" className="text-primary hover:text-accent transition-colors font-medium">
              Reviews
            </a>
            <a href="#contact" className="text-primary hover:text-accent transition-colors font-medium">
              Contact
            </a>
          </nav>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Find Advisor
            </Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Get Quote</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent-dark to-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-accent text-accent-foreground">Retirement • Security • Growth</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Secure Your Retirement with <span className="text-accent">Guaranteed Annuities</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed opacity-90">
                Build a reliable income stream for your golden years with our comprehensive annuity insurance plans.
                Guaranteed returns, tax advantages, and lifetime income options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4">
                  Explore Annuities
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4"
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
                <form className="space-y-4">
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
                      placeholder="Retirement Age"
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
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3">
                    Calculate My Returns
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Annuity Types Section */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Choose Your Annuity Plan</h2>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">
              Different annuity options designed to meet your unique retirement goals and risk tolerance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-primary">Fixed Annuity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary/70 text-center mb-4">
                  Guaranteed fixed returns with principal protection. Perfect for conservative investors.
                </p>
                <ul className="text-sm text-primary/70 space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Guaranteed 4-6% returns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Principal protection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Tax-deferred growth</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-primary">Variable Annuity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary/70 text-center mb-4">
                  Investment-linked returns with potential for higher growth based on market performance.
                </p>
                <ul className="text-sm text-primary/70 space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Market-linked returns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Multiple fund options</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Death benefit protection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Calculator className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-primary">Indexed Annuity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary/70 text-center mb-4">
                  Returns linked to market index with downside protection. Best of both worlds.
                </p>
                <ul className="text-sm text-primary/70 space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Index-linked growth</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Downside protection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Participation rates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-primary">Immediate Annuity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary/70 text-center mb-4">
                  Start receiving income immediately. Perfect for those already in retirement.
                </p>
                <ul className="text-sm text-primary/70 space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Immediate income</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Lifetime payments</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Guaranteed rates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Chainsaw Annuities?</h2>
            <p className="text-xl text-primary/70">Comprehensive benefits designed for your retirement security</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-neutral-gray bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <PiggyBank className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-primary text-xl">Tax Advantages</CardTitle>
                <CardDescription className="text-primary/70">
                  Maximize your retirement savings with significant tax benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-primary/70">Tax-deferred growth</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-primary/70">No annual contribution limits</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-primary/70">Tax-efficient income</span>
                  </li>
                </ul>
                <Button className="w-full bg-primary text-white hover:bg-primary/90">Learn More</Button>
              </CardContent>
            </Card>
            <Card className="border-neutral-gray bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-primary text-xl">Guaranteed Security</CardTitle>
                <CardDescription className="text-primary/70">
                  Your principal and returns are protected with our guarantee
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-primary/70">Principal protection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-primary/70">Guaranteed minimum returns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-primary/70">Insurance company backing</span>
                  </li>
                </ul>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Learn More</Button>
              </CardContent>
            </Card>
            <Card className="border-neutral-gray bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent-dark/10 rounded-lg flex items-center justify-center mb-4">
                  <Banknote className="h-6 w-6 text-accent-dark" />
                </div>
                <CardTitle className="text-primary text-xl">Lifetime Income</CardTitle>
                <CardDescription className="text-primary/70">
                  Guaranteed income that lasts as long as you live
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-primary/70">Monthly income for life</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-primary/70">Inflation protection options</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-primary/70">Survivor benefits</span>
                  </li>
                </ul>
                <Button className="w-full bg-accent-dark text-white hover:bg-accent-dark/90">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">How Annuities Work</h2>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">Simple steps to secure your retirement income</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Choose Your Plan</h3>
              <p className="text-primary/70">
                Select the annuity type that matches your retirement goals and risk tolerance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Make Contributions</h3>
              <p className="text-primary/70">
                Fund your annuity with a lump sum or regular payments during the accumulation phase.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Watch It Grow</h3>
              <p className="text-primary/70">
                Your money grows tax-deferred with guaranteed minimum returns and potential upside.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">4</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Receive Income</h3>
              <p className="text-primary/70">
                Start receiving guaranteed monthly payments when you're ready to retire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent-dark text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Retirement?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Please provide your email address below and our team will reach out to you.
          </p>
          {/* Email Input Form */}
          <div className="max-w-md mx-auto">
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                const email = formData.get("email")
                console.log("Email submitted:", email)
                // Handle email submission here
              }}
            >
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-4 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder:text-white/70 focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-200"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-accent-dark text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center md:justify-items-start">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <Shield className="h-8 w-8 text-accent" />
                <span className="text-2xl font-bold">Chainsaw</span>
              </div>
              <p className="opacity-80 mb-4 max-w-sm">
                Securing retirements for over 50 years with guaranteed annuity solutions and expert financial guidance.
              </p>
              <div className="flex space-x-4 justify-center md:justify-start">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground font-bold">in</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-accent">Contact</h3>
              <div className="space-y-3 opacity-80">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>1-800-CHAINSAW</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>annuities@chainsaw.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Bangkok, Thailand</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary/20 mt-12 pt-8 text-center opacity-60">
            <p>&copy; 2025 Chainsaw Annuity Insurance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
