"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation" 
import { useEffect } from "react"

interface RegistrationCheckProps {
  children: React.ReactNode
}

export default function RegistrationCheck({ children }: RegistrationCheckProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (session && session.user) {
      // Check if user is registered in our system
      const isRegistered = (session.user as any).isRegistered
      
      console.log('RegistrationCheck - User:', session.user.email)
      console.log('RegistrationCheck - Is registered:', isRegistered)
      
      if (!isRegistered) {
        console.log('User not registered, redirecting to registration form')
        // Pre-fill the registration form with Google data
        const googleData = {
          email: session.user.email,
          firstName: session.user.name?.split(' ')[0] || '',
          lastName: session.user.name?.split(' ').slice(1).join(' ') || ''
        }
        
        // Store Google data in sessionStorage for pre-filling the form
        sessionStorage.setItem('googleUserData', JSON.stringify(googleData))
        
        // Redirect to registration
        router.push('/register?source=google')
        return
      }
    }
  }, [session, status, router])

  // Show loading while checking registration status
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-primary">Checking registration status...</p>
        </div>
      </div>
    )
  }

  // If user is not registered, show loading (they'll be redirected)
  if (session && !(session.user as any).isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-primary">Redirecting to registration...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
