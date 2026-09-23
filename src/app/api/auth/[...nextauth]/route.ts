// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { type NextAuthOptions, type Session, type User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Hard‑code test user; thay bằng check DB sau này
        if (
          credentials?.email === "user@example.com" &&
          credentials.password === "hunter2"
        ) {
          return { id: "1", name: "Test User", email: "user@example.com" }
        }

        else if (
          credentials?.email === "koleido@gmail.com" &&
          credentials.password === "scope"
        ) {
          return { id: "2", name: "Koleido", email: "koleido@gmail.com" }
        }

        return null
      }
    })
  ],

  // <-- Type annotation ở đây: NextAuthOptions định nghĩa session.strategy chính xác
  session: {
    strategy: "jwt"  // literal "jwt" sẽ được infer đúng
  },

  callbacks: {
    // khai báo rõ type cho token & user
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      // gắn user vào session để client có thể đọc session.user
      session.user = token.user as User
      return session
    }
  },

  pages: {
    signIn: "/auth/signin"
  }
}

// NextAuth needs both GET and POST handlers in App Router
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
