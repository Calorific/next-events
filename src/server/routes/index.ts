import { router } from '../trpc'
import { eventRouter } from '@/server/routes/event'

export const appRouter = router({
  event: eventRouter
})

export type AppRouter = typeof appRouter