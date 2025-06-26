"use client"
import HeroSection from "@/components/sections/HeroSection"
import AnnuityTypesSection from "@/components/sections/AnnuityTypesSection"
import BenefitsSection from "@/components/sections/BenefitsSection"
import CalculatorSection from "@/components/sections/CalculatorSection"
import HowItWorksSection from "@/components/sections/HowItWorksSection"
import CTASection from "@/components/sections/CTASection"
import Footer from "@/components/sections/Footer"
import WhatIsChainsaw from "@/components/sections/WhatIsChainsaw"
export default function ChainsawAnnuityPage() {
  return (
    <div className="min-h-screen bg-neutral-light">
      <HeroSection />
      <WhatIsChainsaw />
      <AnnuityTypesSection />
      <BenefitsSection />
      <CalculatorSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  )
}
