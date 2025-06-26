import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Star, Zap, Heart } from "lucide-react"

export default function AnnuityTypesSection() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Choose Your Annuity Plan</h2>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Different annuity options designed to meet your unique retirement goals and risk tolerance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-primary">Plan A</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary/70 text-center mb-4">(Standard)</p>
              <ul className="text-sm text-primary/70 space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Insurance premium payment period: 40-59 years old</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Payout age: 60 yeares old</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>% Annual Payout: 7%</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-primary">Plan B</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary/70 text-center mb-4">(Flex+)</p>
              <ul className="text-sm text-primary/70 space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Insurance premium payment period: 35-60 years old</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Payout age: 60 yeares old</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>% Annual Payout: depend</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-primary">Plan C</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary/70 text-center mb-4">(Longlife)</p>
              <ul className="text-sm text-primary/70 space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Insurance premium payment period: 40-55 years old</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Payout age: 56 yeares old</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>% Annual Payout: 6.5%</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
