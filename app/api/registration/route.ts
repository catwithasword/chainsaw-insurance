import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from 'redis'

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL || process.env.KV_URL
})

// Connect to Redis (with error handling)
let isConnected = false
const connectRedis = async () => {
  if (!isConnected) {
    try {
      await redis.connect()
      isConnected = true
      console.log('Redis connected successfully')
    } catch (error) {
      console.error('Redis connection error:', error)
      throw error
    }
  }
}

// Zod schema for validating registration data
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
    .int("Age must be a whole number")
})

type UserData = z.infer<typeof registerSchema> & {
  id: string
  registrationDate: string
  status: 'active' | 'pending' | 'inactive'
}

// Helper function to get all users from Redis
async function getAllUsers(): Promise<UserData[]> {
  try {
    await connectRedis()
    const usersJson = await redis.get('users:all')
    return usersJson ? JSON.parse(usersJson) : []
  } catch (error) {
    console.error('Error reading users from Redis:', error)
    return []
  }
}

// Helper function to save all users to Redis
async function saveAllUsers(users: UserData[]): Promise<boolean> {
  try {
    await connectRedis()
    await redis.set('users:all', JSON.stringify(users))
    return true
  } catch (error) {
    console.error('Error saving users to Redis:', error)
    return false
  }
}

// Helper function to check if email exists
async function emailExists(email: string): Promise<UserData | null> {
  try {
    await connectRedis()
    const userId = await redis.get(`user:email:${email.toLowerCase()}`)
    if (userId) {
      const userJson = await redis.get(`user:${userId}`)
      return userJson ? JSON.parse(userJson) : null
    }
    return null
  } catch (error) {
    console.error('Error checking email existence:', error)
    return null
  }
}

// Helper function to check if passport ID exists
async function passportExists(passportId: string): Promise<UserData | null> {
  try {
    await connectRedis()
    const userId = await redis.get(`user:passport:${passportId.toUpperCase()}`)
    if (userId) {
      const userJson = await redis.get(`user:${userId}`)
      return userJson ? JSON.parse(userJson) : null
    }
    return null
  } catch (error) {
    console.error('Error checking passport existence:', error)
    return null
  }
}

// Helper function to save user to Redis
async function saveUser(user: UserData): Promise<boolean> {
  try {
    await connectRedis()
    
    // Save user data
    await redis.set(`user:${user.id}`, JSON.stringify(user))
    
    // Create indexes for email and passport
    await redis.set(`user:email:${user.email.toLowerCase()}`, user.id)
    await redis.set(`user:passport:${user.passportId.toUpperCase()}`, user.id)
    
    // Update the all users list
    const allUsers = await getAllUsers()
    allUsers.push(user)
    await saveAllUsers(allUsers)
    
    return true
  } catch (error) {
    console.error('Error saving user to Redis:', error)
    return false
  }
}

// Helper function to generate unique ID
function generateUserId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `user_${timestamp}_${randomStr}`
}

export async function POST(request: NextRequest) {
  console.log('Registration API called')
  
  try {
    // Parse request body
    const body = await request.json()
    console.log('Request body received:', body)
    
    // Validate request data using Zod schema
    const validationResult = registerSchema.safeParse(body)
    console.log('Validation result:', validationResult.success ? 'SUCCESS' : 'FAILED')
    
    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error.flatten().fieldErrors)
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const userData = validationResult.data
    console.log('Validated user data:', userData)

    // Check if email already exists
    const existingEmailUser = await emailExists(userData.email)
    if (existingEmailUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User already exists. Please login instead.',
          action: 'login',
          field: 'email',
          user: {
            id: existingEmailUser.id,
            firstName: existingEmailUser.firstName,
            lastName: existingEmailUser.lastName,
            email: existingEmailUser.email
          }
        },
        { status: 409 }
      )
    }

    // Check if passport ID already exists
    const existingPassportUser = await passportExists(userData.passportId)
    if (existingPassportUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Passport ID already exists. Please login instead.',
          action: 'login',
          field: 'passportId',
          user: {
            id: existingPassportUser.id,
            firstName: existingPassportUser.firstName,
            lastName: existingPassportUser.lastName,
            email: existingPassportUser.email
          }
        },
        { status: 409 }
      )
    }    // Create new user object
    const newUser: UserData = {
      id: generateUserId(),
      ...userData,
      registrationDate: new Date().toISOString(),
      status: 'active'
    }
    console.log('New user object created:', { ...newUser, passportId: '[HIDDEN]' })

    // Save user to Redis store
    const saveSuccess = await saveUser(newUser)
    console.log('Save to Redis result:', saveSuccess)
    
    if (!saveSuccess) {
      console.error('Failed to save user data to Redis')
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to save user data'
        },
        { status: 500 }
      )
    }

    console.log('Registration completed successfully')
    // Return success response (without sensitive data)
    const { passportId, ...userResponse } = newUser
    
    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        user: {
          id: userResponse.id,
          firstName: userResponse.firstName,
          lastName: userResponse.lastName,
          email: userResponse.email,
          registrationDate: userResponse.registrationDate,
          status: userResponse.status
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration API error:', error)
    
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // This endpoint could be used to get user statistics or validation
    const allUsers = await getAllUsers()
    
    return NextResponse.json(
      {
        success: true,
        totalUsers: allUsers.length,
        message: 'Users data retrieved successfully'
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Get users API error:', error)
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve users data'
      },
      { status: 500 }
    )
  }
}
