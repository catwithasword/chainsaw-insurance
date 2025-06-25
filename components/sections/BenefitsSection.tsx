import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, PiggyBank, Shield, Banknote } from "lucide-react"

export default function BenefitsSection() {
  return (
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
              <CardTitle className="text-primary text-xl">Comparative Advantage</CardTitle>
              <CardDescription className="text-primary/70">
                Maximize your retirement savings with significant tax benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-primary/70">4.5x greater return compared to traditional models</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-primary/70">7% annual interest rate</span>
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
              <CardTitle className="text-primary text-xl">Decentralized System Advantage</CardTitle>
              <CardDescription className="text-primary/70">
                Your principal and returns are protected with our guarantee
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-primary/70">Transparency</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-primary/70">Financial Visibility</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-primary/70">Governance Rights</span>
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
  )
}
