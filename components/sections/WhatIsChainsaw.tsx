import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Award, Heart, Target } from "lucide-react"
export default function WhatIsChainsaw() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">What is Chainsaw?</h2>
          <p className="text-xl text-primary/70 max-w-3xl mx-auto">
            Your trusted partner in retirement planning, providing secure and reliable annuity solutions for over 50
            years
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Our Mission</h3>
            <p className="text-primary/70 text-lg leading-relaxed mb-6">
              At Chainsaw, we believe everyone deserves a secure and comfortable retirement. We specialize in creating
              personalized annuity solutions that protect your financial future while providing guaranteed income
              streams when you need them most.
            </p>
            <p className="text-primary/70 text-lg leading-relaxed">
              With decades of experience in the financial services industry, we've helped thousands of clients achieve
              their retirement goals through our comprehensive range of annuity products and expert financial guidance.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-accent" />
              </div>
              <h4 className="text-xl font-semibold text-primary mb-2">50,000+</h4>
              <p className="text-primary/70">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-accent" />
              </div>
              <h4 className="text-xl font-semibold text-primary mb-2">50+</h4>
              <p className="text-primary/70">Years Experience</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-primary">Security First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary/70">
                Your investments are protected with industry-leading security measures and backed by our solid financial
                foundation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-primary">Personalized Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary/70">
                Every client receives a customized annuity strategy tailored to their unique financial goals and risk
                tolerance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-primary">Lifetime Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary/70">
                Our dedicated team provides ongoing support and guidance throughout your entire retirement journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}