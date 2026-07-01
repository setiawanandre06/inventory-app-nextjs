import { NextAuthOptions, DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

// Computed once at startup — used as a dummy target when user isn't found
// so bcrypt.compare always runs regardless of whether the user exists
const DUMMY_PASSWORD_HASH = bcrypt.hashSync("invalid-password", 10);

// next-auth default Session and User types don't include id and role
// we need to extend these types to include id and role
declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      role?: string | null;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: string | null;
  }
}

// same goes for JWT
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string | null;
    role?: string | null;
  }
}

// Core authentication logic (extracted for unit testing)
export async function authorizeUser(credentials: {
    email: string;
    password: string;
} | undefined) {
    // check if email and password are provided
    if (!credentials?.email || credentials?.password) {
        return null;
    }

    // ensure email exist in database
    const user = await prisma.user.findUnique({
        where: { email: credentials.email }
    });
    
    if (!user) {
        return null;
    }

    // compare the password (the one from database and the one from the user)
    const isPasswordValid = await bcrypt.compare(
        credentials.password, 
        user.password ?? DUMMY_PASSWORD_HASH
    );

    // Reject login if password does not match
    if (!isPasswordValid) {
        return null;
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: authorizeUser, // Reference the extracted function
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Store user ID and role in token
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            // Pass user ID and role to session
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/login"
    },
    session: {
        strategy: "jwt"
    }
};
