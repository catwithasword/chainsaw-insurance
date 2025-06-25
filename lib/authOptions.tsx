import { NextAuthOptions, User, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import fs from 'fs';
import path from 'path';

// Helper function to check if user exists in Users.json
function checkUserExists(email: string): boolean {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'Users.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    const exists = data.users.some((user: any) => user.email.toLowerCase() === email.toLowerCase());
    console.log(`Checking user existence for ${email}: ${exists}`);
    return exists;
  } catch (error) {
    console.error('Error checking user existence:', error);
    return false;
  }
}

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      isRegistered?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isRegistered?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback triggered for user:', user.email);
      
      // Only check for Google sign-ins
      if (account?.provider === 'google' && user.email) {
        const userExists = checkUserExists(user.email);
        console.log('User exists in Users.json:', userExists);
        
        if (!userExists) {
          console.log('User not registered, should redirect to registration');
          // User is not registered, we'll handle the redirect in the client
          return true; // Allow sign-in but we'll redirect them
        }
      }
      
      return true; // Allow sign-in for registered users
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        
        // Check if user is registered when creating the token
        if (user.email) {
          token.isRegistered = checkUserExists(user.email);
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        // Add registration status to session
        (session as any).user.isRegistered = token.isRegistered;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
