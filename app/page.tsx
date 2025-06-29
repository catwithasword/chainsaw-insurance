"use client"
import HeroSection from "@/components/sections/HeroSection"
import AnnuityTypesSection from "@/components/sections/AnnuityTypesSection"
import BenefitsSection from "@/components/sections/BenefitsSection"
import CalculatorSection from "@/components/sections/CalculatorSection"
import HowItWorksSection from "@/components/sections/HowItWorksSection"
import CTASection from "@/components/sections/CTASection"
import Footer from "@/components/sections/Footer"
import WhatIsChainsaw from "@/components/sections/WhatIsChainsaw"
import Comparison from "@/components/sections/Comparison"
import ConnectButton from "@/components/ui/ConnectButton"; 

export default function ChainsawAnnuityPage() {
  return (
    <div className="min-h-screen bg-neutral-light">
<<<<<<< HEAD
      <div className="p-4">
        <ConnectButton />
      </div>
=======
>>>>>>> d00dd69f54b93c467dac4faca74b0f5f2977ac17
      <HeroSection />
      <WhatIsChainsaw />
      <BenefitsSection />
      <Comparison />
      <AnnuityTypesSection />
      <BenefitsSection />
      <CalculatorSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  )
}
