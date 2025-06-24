import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, TrendingUp, Clock, CheckCircle, Calculator } from "lucide-react"

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
  )
}
