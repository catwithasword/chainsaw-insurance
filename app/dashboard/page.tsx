"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import PortfolioChart from "@/components/dashboard/PortfolioChart"
import CurrentBalanceCard from "@/components/dashboard/CurrentBalanceCard"
import AdditionalCards from "@/components/dashboard/AdditionalCards"
import DashboardActions from "@/components/dashboard/DashboardActions"
import RegistrationCheck from "@/components/RegistrationCheck"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    redirect("/")
  }

  return (
    <RegistrationCheck>
      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Side - Current Balance Card */}
            <div className="flex justify-center lg:justify-end">
              <CurrentBalanceCard />
            </div>

            {/* Right Side - Portfolio Chart */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-lg space-y-6">
                <PortfolioChart />
                <AdditionalCards />
              </div>            
            </div>
          </div>
        </div>

        {/* Dashboard Actions - Outside Main Content */}
        <div className="pt-6">
          <DashboardActions />
        </div>
      </div>
    </RegistrationCheck>
  )
}
