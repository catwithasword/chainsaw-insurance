"use client"
import Header from "@/components/sections/Header"
import HeroSection from "@/components/sections/HeroSection"
import AnnuityTypesSection from "@/components/sections/AnnuityTypesSection"
import BenefitsSection from "@/components/sections/BenefitsSection"
import HowItWorksSection from "@/components/sections/HowItWorksSection"
import CTASection from "@/components/sections/CTASection"
import Footer from "@/components/sections/Footer"

export default function ChainsawAnnuityPage() {
  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      <HeroSection />
      <AnnuityTypesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  )
}
