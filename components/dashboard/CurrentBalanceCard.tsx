import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Custom circular progress component
function CircularProgress({ value, max, className }: { value: number, max: number, className?: string }) {
  const percentage = (value / max) * 100
  const circumference = 2 * Math.PI * 45 // radius of 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={`relative ${className}`}>
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="transparent"
        />        
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#292655"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
        {/* Small indicator */}
        <circle
          cx="73"
          cy="27"
          r="3"
          fill="#507EB4"
        />
      </svg>
    </div>
  )
}

interface CurrentBalanceCardProps {
  currentBalance?: number
  totalBalance?: number
  interestRate?: number
  monthlyAmount?: number
  lastUpdated?: string
  nextPayment?: number
}

export default function CurrentBalanceCard({
  currentBalance = 160000,
  totalBalance = 180000,
  interestRate = 2.82,
  monthlyAmount = 1800,
  lastUpdated = "10 Mar 2023",
  nextPayment = 1300
}: CurrentBalanceCardProps) {
  return (
    <Card className="w-full max-w-sm bg-white rounded-2xl shadow-lg">
      <CardHeader className="text-center pb-4">
        <h2 className="text-lg font-medium text-gray-800">Current Balance</h2>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Circular Progress */}
        <div className="flex justify-center">
          <CircularProgress value={currentBalance} max={totalBalance} />
        </div>            
        
        {/* Balance Amount */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">{currentBalance.toLocaleString()}.00</div>
          <div className="text-sm text-gray-500">from {totalBalance.toLocaleString()}.00 THB</div>
        </div>

        {/* Interest Rate Section */}
        <div className="text-center space-y-2 border-t pt-4">
          <div className="text-sm text-gray-600">Interest Rate</div>
          <div className="text-2xl font-bold text-accent">{interestRate}%</div>
          <div className="text-sm text-gray-500">Monthly: {monthlyAmount.toLocaleString()}.00 THB</div>
        </div>

        {/* Account Details */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Last Updated</span>
            <span className="text-sm font-medium text-gray-800">{lastUpdated}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Next Payment</span>
            <span className="text-sm font-medium text-gray-800">{nextPayment.toLocaleString()}.00 THB</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
