"use client"
import { ReactNode, useState } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'insurance' | 'payment'>('dashboard')

  return (
    <div className="min-h-screen bg-white">
      {/* Dashboard Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-gray-100 text-primary border-b-2 border-primary'
                  : 'bg-gray-100 text-primary hover:bg-gray-200'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('insurance')}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'insurance'
                  ? 'bg-gray-100 text-primary border-b-2 border-primary'
                  : 'bg-gray-100 text-primary hover:bg-gray-200'
              }`}
            >
              Insurance
            </button>
            <button 
              onClick={() => setActiveTab('payment')}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'payment'
                  ? 'bg-gray-100 text-primary border-b-2 border-primary'
                  : 'bg-gray-100 text-primary hover:bg-gray-200'
              }`}
            >
              Payment
            </button>
          </div>
        </div>
      </div>
      
      {/* Page Content */}
      <div className="flex-1">
        {activeTab === 'dashboard' && children}
        {activeTab === 'insurance' && (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Insurance</h2>
            <p className="text-gray-600">Insurance content will be displayed here.</p>
          </div>
        )}
        {activeTab === 'payment' && (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Payment</h2>
            <p className="text-gray-600">Payment content will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
