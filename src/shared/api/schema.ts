import { z } from 'zod'

export const CreateEventSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date()
})

export type CreateEventValues = z.infer<typeof CreateEventSchema>

export const JoinEventSchema = z.object({
  id: z.number().int().positive(),
})