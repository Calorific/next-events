import NextAuth from 'next-auth'

declare module "next-auth" {
  interface User {
    id: number
    email: string
    name: string
  }
  interface Session {
    user: {
      id: number
      email: string
      name: string
    }
  }
}