"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const data = [
  { name: 'High-Yield Zone', value: 35.0, color: '#7DD3C0' },
  { name: 'Staking & LRT', value: 20.0, color: '#4FC3F7' },
  { name: 'Real-world Assets Yield', value: 20.0, color: '#FFD54F' },
  { name: 'Safe Lending', value: 15.0, color: '#FF8A65' },
  { name: 'Stable Reserve', value: 5.0, color: '#9FA8DA' },
  { name: 'VC/High Risk Token', value: 5.0, color: '#CE93D8' }
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  // Only show labels for larger segments
  if (percent > 0.05) {
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    )
  }
  return null
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border">
        <p className="font-semibold">{data.name}</p>
        <p className="text-primary">{data.value.toFixed(2)}%</p>
      </div>
    )
  }
  return null
}

export default function PlanAChart() {
  return (
    <div className="w-full space-y-6">
      {/* Chart Container */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6 text-center">DeFi Portfolio Asset Allocation</h3>
        
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Pie Chart */}
          <div className="w-full lg:w-1/2 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="w-full lg:w-1/2 space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="text-lg font-semibold text-primary mb-4">DeFi Asset Allocation Strategy</h4>
        <div className="space-y-4 text-gray-700">
          <p>
            This DeFi-focused portfolio maximizes yield through diversified strategies across 
            high-yield derivatives, staking protocols, real-world assets, and safe lending platforms.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold text-primary mb-2">High-Yield Zone (35%)</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>Yield Derivatives via Pendle:</strong> Purchase future yield rights in advance</li>
                <li>• <strong>Leverage Strategy via Kamino:</strong> Multiply (SOL, stSOL) for 20-40% APY</li>
              </ul>
              
              <h5 className="font-semibold text-primary mb-2 mt-4">Staking & LRT (20%)</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>ETH Staking:</strong> Get stETH via Lido, RocketPool, EtherFi</li>
                <li>• <strong>Restaking:</strong> Additional yield opportunities</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-primary mb-2">Real-world Assets Yield (20%)</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>Tokenized US Treasury:</strong> Via Ondo, Open Eden, Mountain Protocol</li>
                <li>• <strong>Real Estate-backed:</strong> Through Maple Finance, Goldfinch</li>
              </ul>
              
              <h5 className="font-semibold text-primary mb-2 mt-4">Safe Lending (15%)</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>Lending Pools:</strong> AAVE, Benqi, Morpho</li>
                <li>• <strong>Stable Assets:</strong> USDC/DAI to reduce price volatility</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-primary mb-2">Stable Reserve (5%)</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Safe Wallet Holdings:</strong> Emergency liquidity</li>
                  <li>• <strong>Stablecoin Reserve:</strong> USDC, USDT, DAI</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-primary mb-2">VC/High Risk Token (5%)</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Airdrop Farming:</strong> Early protocol participation</li>
                  <li>• <strong>High-Risk/High-Reward:</strong> Emerging DeFi protocols</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
