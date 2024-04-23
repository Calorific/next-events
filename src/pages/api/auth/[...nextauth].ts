import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/server/db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email)
          return null

        const { email, password } = credentials
        const user = await prisma.user.findUnique({
          where: { email }
        })

        if (user?.password === password) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = Number(token.sub)
      return session
    }
  }
}

export default NextAuth(authOptions)