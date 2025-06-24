import React from 'react'

interface PortfolioChartProps {
  data?: Array<{ date: string; value: number }>
  timeframe?: '7D' | '30D' | '1Y'
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ 
  data = generateMockData(), 
  timeframe = '1Y' 
}) => {
  // Generate SVG path for the chart
  const generatePath = (points: Array<{ x: number; y: number }>) => {
    if (points.length === 0) return ''
    
    const path = points.reduce((acc, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`
      }
      return `${acc} L ${point.x} ${point.y}`
    }, '')
    
    return path
  }

  // Convert data to SVG coordinates
  const chartWidth = 400
  const chartHeight = 200
  const padding = 20
  
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const valueRange = maxValue - minValue
  
  const points = data.map((d, index) => ({
    x: padding + (index / (data.length - 1)) * (chartWidth - 2 * padding),
    y: chartHeight - padding - ((d.value - minValue) / valueRange) * (chartHeight - 2 * padding)
  }))
  
  const pathData = generatePath(points)
  
  // Create area path for gradient fill
  const areaPath = pathData + 
    ` L ${points[points.length - 1].x} ${chartHeight - padding}` +
    ` L ${points[0].x} ${chartHeight - padding} Z`

  return (
    <div className="bg-neutral-white rounded-lg p-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Portfolio Net Value</h3>
        <div className="flex space-x-2">
          <button className={`px-3 py-1 rounded text-sm ${timeframe === '7D' ? 'bg-gray-600' : 'bg-gray-400'}`}>
            7D
          </button>
          <button className={`px-3 py-1 rounded text-sm ${timeframe === '30D' ? 'bg-gray-600' : 'bg-gray-400'}`}>
            30D
          </button>
          <button className={`px-3 py-1 rounded text-sm ${timeframe === '1Y' ? 'bg-gray-600' : 'bg-gray-400'}`}>
            1Y
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg width={chartWidth} height={chartHeight} className="w-full h-auto">
          {/* Gradient definition */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1={padding}
              y1={padding + (i * (chartHeight - 2 * padding) / 4)}
              x2={chartWidth - padding}
              y2={padding + (i * (chartHeight - 2 * padding) / 4)}
              stroke="#374151"
              strokeWidth="0.5"
              opacity="0.5"
            />
          ))}
          
          {/* Area fill */}
          <path
            d={areaPath}
            fill="url(#chartGradient)"
          />
          
          {/* Chart line */}
          <path
            d={pathData}
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="3"
              fill="#3b82f6"
              opacity="0.8"
            />
          ))}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-2">
          <span>${(maxValue / 1000).toFixed(1)}K</span>
          <span>${((maxValue + minValue) / 2000).toFixed(1)}K</span>
          <span>${(minValue / 1000).toFixed(1)}K</span>
        </div>
      </div>

      {/* Date labels */}
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>02/04</span>
        <span>08/04</span>
        <span>14/04</span>
        <span>20/04</span>
        <span>26/04</span>
        <span>02/05</span>
        <span>08/05</span>
        <span>14/05</span>
        <span>20/05</span>
        <span>26/05</span>
        <span>01/06</span>
        <span>07/06</span>
        <span>13/06</span>
        <span>19/06</span>
      </div>
    </div>
  )
}

// Mock data generator
function generateMockData() {
  const baseValue = 1500
  const data = []
  
  for (let i = 0; i < 50; i++) {
    const variation = Math.sin(i * 0.1) * 200 + Math.random() * 100 - 50
    let value = baseValue + variation
    
    // Create a jump around index 35 (like in the image)
    if (i > 35) {
      value += 1500
    }
    
    data.push({
      date: `2024-${String(Math.floor(i / 7) + 1).padStart(2, '0')}-${String((i % 7) + 1).padStart(2, '0')}`,
      value: Math.max(1000, value)
    })
  }
  
  return data
}

export default PortfolioChart
