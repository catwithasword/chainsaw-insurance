"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  CreditCard, 
  Wallet, 
  CheckCircle, 
  Calendar, 
  DollarSign, 
  Shield,
  ArrowRight,
  Clock,
  Star
} from "lucide-react"

interface PaymentMethod {
  id: string
  name: string
  type: "card" | "crypto" | "bank"
  icon: any
  fee: string
  processing: string
}

export default function PaymentWallet() {
  const [selectedPlan, setSelectedPlan] = useState<"A" | "C">("A")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [customAmount, setCustomAmount] = useState("")

  // Payment methods available
  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "Credit/Debit Card",
      type: "card",
      icon: CreditCard,
      fee: "2.9%",
      processing: "Instant"
    },
    {
      id: "crypto",
      name: "Crypto Wallet",
      type: "crypto",
      icon: Wallet,
      fee: "1.5%",
      processing: "5-10 min"
    },
    {
      id: "bank",
      name: "Bank Transfer",
      type: "bank",
      icon: DollarSign,
      fee: "0%",
      processing: "1-3 days"
    }
  ]

  // Plan pricing
  const planPricing = {
    A: {
      name: "Plan A - Standard",
      monthlyBase: 500,
      yearlyDiscount: 0.1, // 10% discount
      description: "Balanced portfolio with 7% annual return"
    },
    C: {
      name: "Plan C - Long-life",
      monthlyBase: 400,
      yearlyDiscount: 0.1, // 10% discount
      description: "Conservative portfolio with 6.5% annual return"
    }
  }

  const currentPlan = planPricing[selectedPlan]
  const monthlyAmount = parseFloat(customAmount) || currentPlan.monthlyBase
  const yearlyAmount = monthlyAmount * 12
  const discountAmount = yearlyAmount * currentPlan.yearlyDiscount
  const finalAmount = yearlyAmount - discountAmount

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentComplete(true)
    }, 3000)
  }

  if (paymentComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
            <p className="text-green-700 mb-4">
              Your yearly premium of ${finalAmount.toLocaleString()} has been processed.
            </p>
            <Badge className="bg-green-100 text-green-800 mb-4">
              Coverage Active for 12 months
            </Badge>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => setPaymentComplete(false)}
            >
              Make Another Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Yearly Premium Payment</h1>
        <p className="text-primary/70">Manage your insurance premium payments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Side - Plan Selection */}
        <div>
          {/* Plan Selection */}
          <Card className="border-neutral-gray bg-white h-80">
            <CardHeader>
              <CardTitle className="text-primary flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Select Your Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedPlan} onValueChange={(value: "A" | "C") => setSelectedPlan(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your insurance plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Plan A - Standard (7% return)</SelectItem>
                  <SelectItem value="C">Plan C - Long-life (6.5% return)</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">{currentPlan.name}</h4>
                <p className="text-sm text-primary/70">{currentPlan.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Payment Amount */}
        <div>
          {/* Amount Configuration */}
          <Card className="border-neutral-gray bg-white h-80">
            <CardHeader>
              <CardTitle className="text-primary flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Payment Amount</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">
                  Monthly Base Amount (USD)
                </label>
                <Input
                  type="number"
                  placeholder={currentPlan.monthlyBase.toString()}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="border-neutral-gray"
                />
                <p className="text-xs text-primary/60">
                  Default: ${currentPlan.monthlyBase}/month
                </p>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-neutral-light rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-primary/70">Monthly amount:</span>
                  <span className="font-semibold text-primary">${monthlyAmount.toLocaleString()}</span>
                </div>
                <hr className="border-neutral-gray" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">Total Amount:</span>
                  <span className="text-2xl font-bold text-accent">${yearlyAmount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom - Payment Section */}
      <Card className="border-neutral-gray bg-white">
        <CardContent className="p-6">
          <Button
            className="w-full bg-accent hover:bg-accent/90 text-white h-12 text-lg"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 animate-spin" />
                <span>Processing Payment...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Pay ${yearlyAmount.toLocaleString()}</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            )}
          </Button>
          
          <p className="text-xs text-primary/60 text-center mt-3">
            Secure payment powered by industry-standard encryption
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
