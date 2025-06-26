"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, User, DollarSign, Calendar, TrendingUp } from "lucide-react"

export default function CalculatorSection() {
  const [formData, setFormData] = useState({
    currentAge: "",
    targetAmount: "",
    monthlyPayment: "",
    retirementAge: ""
  })

  const [selectedPlan, setSelectedPlan] = useState<"A" | "C">("A")

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateReturns = () => {
    const currentAge = parseInt(formData.currentAge) || 0
    const retirementAge = parseInt(formData.retirementAge) || 65
    const monthlyPayment = parseFloat(formData.monthlyPayment) || 0
    const years = retirementAge - currentAge

    if (years <= 0 || monthlyPayment <= 0) return 0

    // Different rates for different plans
    const rates = {
      A: 0.07, // 7% standard
      C: 0.065  // 6.5% long-life
    }

    const rate = rates[selectedPlan]
    const monthlyRate = rate / 12
    const totalMonths = years * 12

    // Future value of annuity formula
    const futureValue = monthlyPayment * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate)
    return futureValue
  }

  const projectedAmount = calculateReturns()

  const plans = [
    {
      id: "A" as const,
      name: "Plan A",
      description: "Standard Portfolio",
      rate: "7%",
      risk: "Standard",
      features: [
        "High-Yield Zone (35%) - Pendle yield derivatives & Kamino leverage",
        "Staking & LRT (20%) - ETH staking via Lido, RocketPool, EtherFi", 
        "Real-world Assets (20%) - US Treasury & real estate tokens",
        "Safe Lending (15%) - AAVE, Benqi, Morpho pools",
        "Stable Reserve (5%) + VC/High Risk (5%)"
      ],
      color: "bg-blue-50 border-blue-200",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    {
      id: "C" as const,
      name: "Plan C",
      description: "Long-life Portfolio", 
      rate: "6.5%",
      risk: "Long-life",
      features: [
        "High-Yield Zone (30%) - Pendle yield derivatives & Kamino leverage",
        "Staking & LRT (30%) - ETH staking via Lido, RocketPool, EtherFi",
        "Safe Lending (20%) - AAVE, Benqi, Morpho with USDC/DAI",
        "Stable Reserve (10%) - Safe wallet holdings",
        "Real-world Assets (5%) + VC/High Risk (5%)"
      ],
      color: "bg-green-50 border-green-200",
      badgeColor: "bg-green-100 text-green-800"
    }
  ]

  return (
    <section id="calculator" className="py-20 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Insurance Premium Calculator
          </h2>
          <p className="text-xl text-primary/70">
            Calculate your retirement savings with our different investment plans
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Calculator Form */}
          <div className="space-y-6">
            <Card className="border-neutral-gray bg-white">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-primary">Customize Your Plan</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Age Input */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-primary">
                    <User className="h-4 w-4" />
                    <span>Current Age</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter your current age"
                    value={formData.currentAge}
                    onChange={(e) => handleInputChange("currentAge", e.target.value)}
                    className="border-neutral-gray"
                  />
                </div>

                {/* Retirement Age */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-primary">
                    <Calendar className="h-4 w-4" />
                    <span>Target Retirement Age</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="65"
                    value={formData.retirementAge}
                    onChange={(e) => handleInputChange("retirementAge", e.target.value)}
                    className="border-neutral-gray"
                  />
                </div>

                {/* Monthly Payment */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-primary">
                    <DollarSign className="h-4 w-4" />
                    <span>Monthly Premium Payment</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter monthly payment amount"
                    value={formData.monthlyPayment}
                    onChange={(e) => handleInputChange("monthlyPayment", e.target.value)}
                    className="border-neutral-gray"
                  />
                  <p className="text-xs text-primary/60">
                    Recommended: $500 - $2,000 per month
                  </p>
                </div>

                {/* Projected Amount Display */}
                {projectedAmount > 0 && (
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      <span className="font-semibold text-primary">Projected Amount at Retirement</span>
                    </div>
                    <div className="text-3xl font-bold text-accent">
                      ${projectedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-sm text-primary/60 mt-1">
                      Based on {selectedPlan === "A" ? "7%" : "6.5%"} annual return
                    </p>
                  </div>
                )}

                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Calculate Premium
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Plan Selection */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-6">Choose Your Investment Plan</h3>
            
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPlan === plan.id 
                    ? `${plan.color} border-2 shadow-lg` 
                    : "border-neutral-gray bg-white hover:shadow-md"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-1">{plan.name}</h4>
                      <p className="text-primary/70">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{plan.rate}</div>
                      <Badge className={plan.badgeColor}>
                        {plan.risk}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-sm text-primary/70">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {selectedPlan === plan.id && (
                    <div className="mt-4 pt-4 border-t border-accent/20">
                      <Badge className="bg-accent text-white">
                        Selected Plan
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
