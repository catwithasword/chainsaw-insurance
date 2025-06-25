import React, { useState } from 'react'

interface PortfolioChartProps {
  data?: Array<{ date: string; value: number }>
  initialTimeframe?: '7D' | '30D' | '1Y'
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ 
  data, 
  initialTimeframe = '1Y' 
}) => {
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '1Y'>(initialTimeframe)
  
  // Use provided data or generate mock data based on timeframe
  const chartData = data || generateMockData(timeframe)
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
  
  const maxValue = Math.max(...chartData.map(d => d.value))
  const minValue = Math.min(...chartData.map(d => d.value))
  const valueRange = maxValue - minValue
  
  const points = chartData.map((d, index) => ({
    x: padding + (index / (chartData.length - 1)) * (chartWidth - 2 * padding),
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
          <button 
            onClick={() => setTimeframe('7D')}
            className={`px-3 py-1 rounded text-sm ${timeframe === '7D' ? 'bg-gray-600' : 'bg-gray-400'}`}
          >
            7D
          </button>
          <button 
            onClick={() => setTimeframe('30D')}
            className={`px-3 py-1 rounded text-sm ${timeframe === '30D' ? 'bg-gray-600' : 'bg-gray-400'}`}
          >
            30D
          </button>
          <button 
            onClick={() => setTimeframe('1Y')}
            className={`px-3 py-1 rounded text-sm ${timeframe === '1Y' ? 'bg-gray-600' : 'bg-gray-400'}`}
          >
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
        {chartData.filter((_, index) => {
          // Show fewer labels for better readability
          const step = Math.ceil(chartData.length / 6)
          return index % step === 0 || index === chartData.length - 1
        }).map((d, index) => (
          <span key={index}>{new Date(d.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}</span>
        ))}
      </div>
    </div>
  )
}

// Mock data generator
function generateMockData(timeframe: '7D' | '30D' | '1Y' = '1Y') {
  const baseValue = 1500
  const data = []
  
  // Determine data points based on timeframe
  let dataPoints: number
  let dateIncrement: number
  
  switch (timeframe) {
    case '7D':
      dataPoints = 7
      dateIncrement = 1 // daily
      break
    case '30D':
      dataPoints = 30
      dateIncrement = 1 // daily
      break
    case '1Y':
      dataPoints = 50
      dateIncrement = 7 // weekly
      break
    default:
      dataPoints = 50
      dateIncrement = 7
  }
  
  for (let i = 0; i < dataPoints; i++) {
    const variation = Math.sin(i * 0.1) * 200 + Math.random() * 100 - 50
    let value = baseValue + variation
    
    // Create different patterns based on timeframe
    if (timeframe === '7D') {
      // More volatile for 7 days
      value += Math.random() * 400 - 200
    } else if (timeframe === '30D') {
      // Medium volatility for 30 days
      value += Math.random() * 600 - 300
      if (i > 20) value += 800 // Growth trend
    } else {
      // Yearly pattern with major jump (like in the original)
      if (i > 35) {
        value += 1500
      }
    }
    
    // Generate appropriate dates
    const date = new Date()
    if (timeframe === '7D') {
      date.setDate(date.getDate() - (6 - i))
    } else if (timeframe === '30D') {
      date.setDate(date.getDate() - (29 - i))
    } else {
      date.setDate(date.getDate() - (dataPoints - 1 - i) * 7)
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(1000, value)
    })
  }
  
  return data
}

export default PortfolioChart
