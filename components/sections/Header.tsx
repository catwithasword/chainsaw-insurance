"use client"
import { Button } from "@/components/ui/button"
import { Bird, Wallet } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { connectWallet } from "@/utils/connectWallet"
import { useState } from "react"

export default function Header() {
  const { data: session, status } = useSession()
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  const handleConnectWallet = async () => {
  const address = await connectWallet();
  if (address) {
    setWalletAddress(address);
  }
};
  const handleSignOut = () => {    
    signOut()
  }
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-md border-b border-neutral-gray z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
          <Bird className="h-8 w-8 text-accent" />
          <span className="text-2xl font-bold text-primary">PensionDAO</span>
        </a>        
        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex space-x-8">
            <a href="/#products" className="text-primary hover:text-accent transition-colors font-medium">
              Annuity Plans
            </a>
            <a href="/#benefits" className="text-primary hover:text-accent transition-colors font-medium">
              Benefits
            </a>
            <a href="/#calculator" className="text-primary hover:text-accent transition-colors font-medium">
              Calculator
            </a>
            {session && (session.user as any).isRegistered && (
              <a href="/dashboard" className="text-primary hover:text-accent transition-colors font-medium">
                Dashboard
              </a>
            )}
            {session && !(session.user as any).isRegistered && (
              <a href="/register" className="text-primary hover:text-accent transition-colors font-medium">
                Complete Registration
              </a>
            )}
            <a href="/#contact" className="text-primary hover:text-accent transition-colors font-medium">
              Contact
            </a>
          </nav>
          
          {status === "loading" ? (
            <Button variant="outline" disabled className="bg-white text-primary border border-primary flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span>Loading...</span>
            </Button>
          ) : session ? (
            <div className="flex items-center space-x-4">              
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="bg-white text-primary hover:bg-primary hover:text-white border border-primary"
              >
                Sign Out
              </Button>
              <Button 
              onClick={handleConnectWallet}
              className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center space-x-2">
              <Wallet className="h-4 w-4" />
              <span>{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}</span>
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleSignIn}
              className="bg-white text-primary hover:bg-primary hover:text-white border border-primary flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign in with Google</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
