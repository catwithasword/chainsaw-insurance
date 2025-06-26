"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const { data: session } = useSession() ?? { data: null }
  const router = useRouter()

  const handleExploreAnnuities = () => {
    if (session) {
      router.push("/dashboard")
    } else {
      signIn("google", { callbackUrl: "/dashboard" })
    }
  }

  return (
    <section className="bg-gradient-to-br from-primary via-accent-dark to-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-6 bg-accent text-accent-foreground">Retirement • Security • Growth</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Own Your Future with <span className="text-accent">High-Yield, Blockchain-Based Annuities</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed opacity-90">
                Earn more. Own more. The first blockchain-based annuity protocol that gives you higher yield, full
                transparency, and global access — governed by the people.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4"
                  onClick={handleExploreAnnuities}
                >
                  {session ? "View Dashboard" : "Explore Annuities"}
                </Button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
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
        </div>
      </div>
    </section>
  )
}
