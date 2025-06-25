"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Zod schema for form validation
const registerSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
  
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
  
  telephone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[\+]?[0-9\-\(\)\s]+$/, "Invalid phone number format"),
  
  email: z.string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  
  address: z.string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
  
  birthDate: z.string()
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 25 && age <= 50
    }, "You must be between 25 and 50 years old"),
  
  passportId: z.string()
    .min(6, "Passport ID must be at least 6 characters")
    .max(20, "Passport ID must be less than 20 characters")
    .regex(/^[A-Z0-9]+$/, "Passport ID can only contain uppercase letters and numbers"),
  
  age: z.number()
    .min(25, "Age must be at least 25")
    .max(50, "Age must be less than 50")
    .int("Age must be a whole number"),

  // KYC fields
  investmentExperience: z.string()
    .min(1, "Please select your investment experience"),
  
  annualIncome: z.string()
    .min(1, "Please select your annual income range"),
  
  riskProfile: z.string()
    .min(1, "Please select your risk profile"),
  
  kycConsent: z.boolean()
    .refine((val) => val === true, "You must consent to KYC verification")
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'success' | 'error' | 'info'
    title: string
    message: string
    onConfirm?: () => void
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  })
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      telephone: "",
      email: "",
      address: "",
      birthDate: "",
      passportId: "",
      age: undefined,
      investmentExperience: "",
      annualIncome: "",
      riskProfile: "",
      kycConsent: false
    }
  })

  // Pre-fill form with Google data if available
  useEffect(() => {
    const googleData = sessionStorage.getItem('googleUserData')
    if (googleData) {
      try {
        const data = JSON.parse(googleData)
        console.log('Pre-filling form with Google data:', data)
        
        if (data.firstName) setValue('firstName', data.firstName)
        if (data.lastName) setValue('lastName', data.lastName)
        if (data.email) setValue('email', data.email)
        
        // Clear the stored data after using it
        sessionStorage.removeItem('googleUserData')
      } catch (error) {
        console.error('Error parsing Google data:', error)
      }
    }
  }, [setValue])

  // Calculate age from birth date
  const watchedBirthDate = watch("birthDate")
  
  const calculateAge = (birthDate: string) => {
    if (!birthDate) return ""
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }
  // Auto-calculate age when birth date changes
  useEffect(() => {
    if (watchedBirthDate) {
      const calculatedAge = calculateAge(watchedBirthDate)
      if (calculatedAge) {
        setValue("age", calculatedAge)
      }
    }
  }, [watchedBirthDate, setValue])
  
  const onSubmit = async (data: RegisterFormData) => {
    console.log('=== FORM SUBMISSION STARTED ===')
    console.log('Form data:', data)
    console.log('Is form submitting?', isSubmitting)
    
    setIsSubmitting(true)
    
    try {
      console.log('About to send request to /api/registration')
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('Response received - status:', response.status, 'ok:', response.ok)

      const result = await response.json()
      console.log('Response result:', result)

      if (!response.ok) {
        console.error('Registration failed with status:', response.status)
        if (result.errors) {
          // Handle validation errors
          console.error('Validation errors:', result.errors)
          const errorMessages = Object.values(result.errors).flat().join('\n• ')
          setModalState({
            isOpen: true,
            type: 'error',
            title: 'Validation Failed',
            message: `Please fix the following errors:\n\n• ${errorMessages}`
          })
        } else if (result.action === 'login') {
          // Handle existing user - redirect to home to use header login
          setModalState({
            isOpen: true,
            type: 'info',
            title: 'User Already Exists',
            message: `${result.message}\n\nWould you like to go to the home page to sign in?`,
            onConfirm: () => {
              setModalState({ ...modalState, isOpen: false })
              router.push('/')
            }
          })
        } else if (result.field) {
          // Handle other duplicate field errors
          setModalState({
            isOpen: true,
            type: 'error',
            title: 'Registration Error',
            message: result.message
          })
        } else {
          console.error('Unknown error:', result)
          setModalState({
            isOpen: true,
            type: 'error',
            title: 'Registration Failed',
            message: result.message || 'An unknown error occurred. Please try again.'
          })
        }
        return
      }

      // Success
      console.log('Registration successful:', result)
      
      // Show success message with instructions
      const message = `Registration successful! Welcome, ${result.user.firstName}!\n\nTo complete the process:\n1. You will be signed out\n2. Please sign in again with Google\n3. You'll then be able to access the dashboard`
      
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'Registration Successful!',
        message: message,
        onConfirm: async () => {
          setModalState({ ...modalState, isOpen: false })
          reset()
          
          // Sign out to refresh session
          const { signOut } = await import('next-auth/react')
          await signOut({ callbackUrl: '/' })
        }
      })
      
    } catch (error) {
      console.error("Registration error:", error)
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Registration Failed',
        message: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onError = (errors: any) => {
    console.log('=== FORM VALIDATION FAILED ===')
    console.log('Validation errors:', errors)
    
    // Show detailed error information in modal
    const errorMessages = Object.entries(errors).map(([field, error]: [string, any]) => {
      return `• ${field}: ${error.message}`
    }).join('\n')
    
    setModalState({
      isOpen: true,
      type: 'error',
      title: 'Form Validation Failed',
      message: `Please fix the following errors:\n\n${errorMessages}`
    })
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary text-center">
            Register for Chainsaw Insurance
          </CardTitle>
        </CardHeader>
          <CardContent>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-primary font-medium">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className="border-2 border-gray-300 focus:border-accent placeholder:text-gray-400"
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-primary font-medium">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className="border-2 border-gray-300 focus:border-accent placeholder:text-gray-400"
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telephone" className="text-primary font-medium">
                  Telephone *
                </Label>
                <Input
                  id="telephone"
                  {...register("telephone")}
                  className="border-2 border-gray-300 focus:border-accent placeholder:text-gray-400"
                  placeholder="08112345678"
                />
                {errors.telephone && (
                  <p className="text-red-500 text-sm">{errors.telephone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="border-2 border-gray-300 focus:border-accent placeholder:text-gray-400"
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-primary font-medium">
                Address *
              </Label>
              <Input
                id="address"
                {...register("address")}
                className="border-2 border-gray-300 focus:border-accent placeholder:text-gray-400"
                placeholder="Enter your full address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Birth Date and Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-primary font-medium">
                  Birth Date *
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  {...register("birthDate")}
                  className="border-2 border-gray-300 focus:border-accent"
                />
                {errors.birthDate && (
                  <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-primary font-medium">
                  Age *
                </Label>
                <Input
                  id="age"
                  type="number"
                  {...register("age", { valueAsNumber: true })}
                  className="border-2 border-gray-300 focus:border-accent placeholder:text-gray-400"
                  placeholder="Auto-calculated from birth date"
                  readOnly
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">{errors.age.message}</p>
                )}
              </div>
            </div>

            {/* Passport ID */}
            <div className="space-y-2">
              <Label htmlFor="passportId" className="text-primary font-medium">
                Passport ID *
              </Label>
              <Input
                id="passportId"
                {...register("passportId")}
                className="border-2 border-gray-300 focus:border-accent placeholder:text-gray-400"
                placeholder="Enter your passport ID"
                style={{ textTransform: 'uppercase' }}
              />
              {errors.passportId && (
                <p className="text-red-500 text-sm">{errors.passportId.message}</p>
              )}
            </div>

            {/* KYC Section */}
            <div className="space-y-4 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
              <h3 className="text-lg font-semibold text-primary mb-4">KYC Verification (Mock)</h3>
              
              {/* Document Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-primary font-medium">
                    Identity Document *
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-accent transition-colors">
                    <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600">Upload Passport/ID Card</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-primary font-medium">
                    Proof of Address *
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-accent transition-colors">
                    <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600">Upload Utility Bill/Bank Statement</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="space-y-3">
                <Label className="text-primary font-medium block">
                  Risk Assessment *
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="radio" 
                      value="conservative"
                      {...register("riskProfile")}
                      className="text-primary focus:ring-accent" 
                    />
                    <span className="text-sm">Conservative (Low Risk)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="radio" 
                      value="moderate"
                      {...register("riskProfile")}
                      className="text-primary focus:ring-accent" 
                    />
                    <span className="text-sm">Moderate (Medium Risk)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="radio" 
                      value="aggressive"
                      {...register("riskProfile")}
                      className="text-primary focus:ring-accent" 
                    />
                    <span className="text-sm">Aggressive (High Risk)</span>
                  </label>
                </div>
                {errors.riskProfile && (
                  <p className="text-red-500 text-sm">{errors.riskProfile.message}</p>
                )}
              </div>

              {/* Investment Experience */}
              <div className="space-y-2">
                <Label className="text-primary font-medium">
                  Investment Experience *
                </Label>
                <select 
                  {...register("investmentExperience")}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:border-accent focus:outline-none"
                >
                  <option value="" disabled>Select your experience level</option>
                  <option value="beginner">Beginner (0-2 years)</option>
                  <option value="intermediate">Intermediate (3-7 years)</option>
                  <option value="experienced">Experienced (8+ years)</option>
                </select>
                {errors.investmentExperience && (
                  <p className="text-red-500 text-sm">{errors.investmentExperience.message}</p>
                )}
              </div>

              {/* Annual Income */}
              <div className="space-y-2">
                <Label className="text-primary font-medium">
                  Annual Income Range *
                </Label>
                <select 
                  {...register("annualIncome")}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:border-accent focus:outline-none"
                >
                  <option value="" disabled>Select income range</option>
                  <option value="under-50k">Under $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-250k">$100,000 - $250,000</option>
                  <option value="250k-500k">$250,000 - $500,000</option>
                  <option value="over-500k">Over $500,000</option>
                </select>
                {errors.annualIncome && (
                  <p className="text-red-500 text-sm">{errors.annualIncome.message}</p>
                )}
              </div>

              {/* Compliance Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-gray-300">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    {...register("kycConsent")}
                    className="mt-1 text-primary focus:ring-accent" 
                  />
                  <span className="text-sm text-gray-700">
                    I consent to KYC verification and document processing
                  </span>
                </label>
                {errors.kycConsent && (
                  <p className="text-red-500 text-sm">{errors.kycConsent.message}</p>
                )}
              </div>

              {/* KYC Status */}
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm text-yellow-800">
                  KYC verification will be completed after registration submission
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={() => {
                  console.log('=== SUBMIT BUTTON CLICKED ===')
                  console.log('Form errors:', errors)
                  console.log('Is submitting:', isSubmitting)
                }}
                className="w-full bg-primary text-white hover:bg-accent-dark py-3 text-lg font-medium"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Registering...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </Button>            </div>
          </form>
        </CardContent>
      </Card>

      {/* Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                modalState.type === 'success' ? 'bg-green-100' : 
                modalState.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                {modalState.type === 'success' && (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
                {modalState.type === 'error' && (
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                )}
                {modalState.type === 'info' && (
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                )}
              </div>
              <h3 className={`text-lg font-semibold ${
                modalState.type === 'success' ? 'text-green-800' : 
                modalState.type === 'error' ? 'text-red-800' : 'text-blue-800'
              }`}>
                {modalState.title}
              </h3>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 whitespace-pre-line">{modalState.message}</p>
            </div>
            
            <div className="flex justify-end space-x-3">
              {modalState.onConfirm ? (
                <>
                  {modalState.type !== 'success' && (
                    <button
                      onClick={() => setModalState({ ...modalState, isOpen: false })}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={modalState.onConfirm}
                    className={`px-4 py-2 text-white rounded hover:opacity-90 ${
                      modalState.type === 'success' ? 'bg-green-600' : 
                      modalState.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
                    }`}
                  >
                    {modalState.type === 'success' ? 'Continue' : 'Confirm'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setModalState({ ...modalState, isOpen: false })}
                  className={`px-4 py-2 text-white rounded hover:opacity-90 ${
                    modalState.type === 'success' ? 'bg-green-600' : 
                    modalState.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
                  }`}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
