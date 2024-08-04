import { isAuth, procedure, router } from '../trpc'
import { prisma } from '@/server/db'
import { CreateEventSchema, JoinEventSchema, LeaveEventSchema, UpdateEventSchema } from '@/shared/api';
import { z } from 'zod'

export const eventRouter = router({
  findMany: procedure.query(async ({ ctx: { user }}) => {
    const events = await prisma.event.findMany({
      include: {
        participations: true,
      },
    })

    return events?.map(({ participations, ...event}) => ({
      ...event,
      isJoined: participations.some(({ userId }) => userId === user?.id)
    }))
  }),
  create: procedure
    .input(CreateEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.event.create({ data: { ...input, authorId: user.id } })
    }),
  update: procedure
    .input(UpdateEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.event.update({
        where: {
          authorId: user.id,
          id: input.id,
        },
        data: input,
      })
    }),
  join: procedure
    .input(JoinEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.create({
        data: {
          eventId: input.id,
          userId: user.id,
        }
      })
    }),
  leave: procedure
    .input(LeaveEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.delete({
        where: {
          userId_eventId: {
            eventId: input.id,
            userId: user.id,
          }
        }
      })
    }),
  findUnique: procedure
    .input(z.object({
      id: z.number(),
    }))
    .use(isAuth)
    .query(({ input }) => {
      return prisma.event.findUnique({
        where: { id: input.id },
        select: {
          title: true,
          description: true,
          date: true,
          authorId: true,
          participations: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })
    })
})