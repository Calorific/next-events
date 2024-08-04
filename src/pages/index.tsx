import { trpc } from '@/shared/api'
import { EventCard } from '@/entities/event'
import { JoinEventButton } from '@/features/join-event'
import { LeaveEventButton } from '@/features/leave-event'
import { useSession } from 'next-auth/react'


export default function Home() {
  const { data, isLoading, refetch } = trpc.event.findMany.useQuery()

  const { data: session } = useSession()

  if (isLoading)
    return <p>Loading...</p>

  return (
    <ul className='mx-auto max-w-4xl'>
      {data?.map(event => (
        <li key={event.id} className='mb-6'>
          <EventCard
            {...event}
            action={session?.user && (!event.isJoined
              ? <JoinEventButton eventId={event.id} onSuccess={refetch} />
              : <LeaveEventButton eventId={event.id} onSuccess={refetch} />
            )}
          />
        </li>
      ))}
    </ul>
  )
}