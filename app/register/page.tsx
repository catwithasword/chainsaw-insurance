"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import RegisterForm from "@/components/register/RegisterForm"

export default function RegisterPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      console.log('No session, redirecting to home')
      router.push("/")
      return
    }

    // If user is already registered, redirect to dashboard
    if ((session.user as any).isRegistered) {
      console.log('User already registered, redirecting to dashboard')
      router.push("/dashboard")
      return
    }

    console.log('User is signed in but not registered, showing registration form')
  }, [session, status, router])
  
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-primary">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-primary">Redirecting...</p>
        </div>
      </div>
    )
  }

  // If user is already registered, show loading while redirecting
  if ((session.user as any).isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-primary">Already registered, redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return <RegisterForm />
}
