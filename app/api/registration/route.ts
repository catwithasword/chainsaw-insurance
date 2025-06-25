import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'

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

// Helper function to read users from JSON file
function readUsersFromFile(): { users: UserData[] } {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'Users.json')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Error reading users file:', error)
    return { users: [] }
  }
}

// Helper function to write users to JSON file
function writeUsersToFile(data: { users: UserData[] }): boolean {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'Users.json')
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Error writing users file:', error)
    return false
  }
}

// Helper function to generate unique ID
function generateUserId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `user_${timestamp}_${randomStr}`
}

// Helper function to check if email already exists
function emailExists(email: string, users: UserData[]): boolean {
  return users.some(user => user.email.toLowerCase() === email.toLowerCase())
}

// Helper function to check if passport ID already exists
function passportExists(passportId: string, users: UserData[]): boolean {
  return users.some(user => user.passportId.toUpperCase() === passportId.toUpperCase())
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

    // Read existing users
    const usersData = readUsersFromFile()
    console.log('Current users count:', usersData.users.length)
      // Check if email already exists
    if (emailExists(userData.email, usersData.users)) {
      const existingUser = usersData.users.find(user => user.email.toLowerCase() === userData.email.toLowerCase())
      return NextResponse.json(
        {
          success: false,
          message: 'User already exists. Please login instead.',
          action: 'login',
          field: 'email',
          user: {
            id: existingUser?.id,
            firstName: existingUser?.firstName,
            lastName: existingUser?.lastName,
            email: existingUser?.email
          }
        },
        { status: 409 }
      )
    }

    // Check if passport ID already exists
    if (passportExists(userData.passportId, usersData.users)) {
      const existingUser = usersData.users.find(user => user.passportId.toUpperCase() === userData.passportId.toUpperCase())
      return NextResponse.json(
        {
          success: false,
          message: 'Passport ID already exists. Please login instead.',
          action: 'login',
          field: 'passportId',
          user: {
            id: existingUser?.id,
            firstName: existingUser?.firstName,
            lastName: existingUser?.lastName,
            email: existingUser?.email
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

    // Add new user to the list
    usersData.users.push(newUser)
    console.log('User added to list, total users:', usersData.users.length)

    // Write updated data back to file
    const writeSuccess = writeUsersToFile(usersData)
    console.log('Write to file result:', writeSuccess)
    
    if (!writeSuccess) {
      console.error('Failed to write to Users.json file')
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
    const usersData = readUsersFromFile()
    
    return NextResponse.json(
      {
        success: true,
        totalUsers: usersData.users.length,
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
