import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Network, Blend } from "lucide-react"

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Why Choose PensionDAO Annuities?</h2>
          <p className="text-xl text-primary/70">Comprehensive benefits designed for your retirement security</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-neutral-gray bg-white hover:shadow-xl transition-shadow flex flex-col h-full">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-primary text-xl">Higher Yield (guarantee APY)</CardTitle>
              <CardDescription className="text-primary/70">
                Earn more than traditional annuities with real on-chain yield
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <Button className="w-full bg-primary text-white hover:bg-primary/90 mt-auto">Learn More</Button>
            </CardContent>
          </Card>
          <Card className="border-neutral-gray bg-white hover:shadow-xl transition-shadow flex flex-col h-full">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Blend className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-primary text-xl">Transaparent</CardTitle>
              <CardDescription className="text-primary/70">
                Track your money in real time, see how Daos invests it, where, and why
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <Button className="w-full bg-primary text-white hover:bg-primary/90 mt-auto">Learn More</Button>
            </CardContent>
          </Card>
          <Card className="border-neutral-gray bg-white hover:shadow-xl transition-shadow flex flex-col h-full">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Network className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-primary text-xl">Decentralized & Trustless</CardTitle>
              <CardDescription className="text-primary/70">
                You don’t rely on institutions — you rely on code and community
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <Button className="w-full bg-primary text-white hover:bg-primary/90 mt-auto">Learn More</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
