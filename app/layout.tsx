import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'
import Header from '@/components/sections/Header'
import React from 'react'

export const metadata: Metadata = {
  title: 'Chainsaw Annuity Insurance',
  description: 'Secure Your Retirement with Guaranteed Annuities',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen grid grid-rows-[auto_1fr]">
            <Header />
            <main>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
