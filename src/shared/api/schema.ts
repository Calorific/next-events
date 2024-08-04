import { z } from 'zod'

export const CreateEventSchema = z.object({
  title: z.string(),
  description: z.union([z.string(), z.null()]),
  date: z.coerce.date()
})

export const UpdateEventSchema = CreateEventSchema.extend({
  id: z.number(),
})

export type CreateEventValues = z.infer<typeof CreateEventSchema>
export type UpdateEventValues = z.infer<typeof UpdateEventSchema>

export const JoinEventSchema = z.object({
  id: z.number().int().positive(),

})

export const LeaveEventSchema = JoinEventSchema