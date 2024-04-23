import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getServerSession } from 'next-auth'
import { inferAsyncReturnType } from '@trpc/server'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerSession(req, res, authOptions)

  return {
    user: session?.user,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>