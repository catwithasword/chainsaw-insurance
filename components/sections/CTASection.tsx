"use client"
import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function CTASection() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleGetQuote = () => {
    if (session) {
      router.push("/dashboard")
    } else {
      signIn("google", { callbackUrl: "/dashboard" })
    }
  }

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent-dark text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Retirement?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Get a personalized annuity quote and start building your guaranteed retirement income today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4"
            onClick={handleGetQuote}
          >
            {session ? "View Dashboard" : "Get Free Quote"}
          </Button>
        </div>
      </div>
    </section>
  )
}
