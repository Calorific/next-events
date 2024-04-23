import { trpc } from '@/shared/api'
import { EventCard } from '@/entities/event/ui/card'
import { JoinEventButton } from '@/features/join-event'


export default function Home() {
  const { data, isLoading, refetch} = trpc.event.findMany.useQuery()

  if (isLoading)
    return <p>Loading...</p>

  return (
    <ul className='mx-auto max-w-4xl'>
      {data?.map(event => (
        <li key={event.id} className='mb-6'>
          <EventCard
            {...event}
            action={!event.isJoined ? <JoinEventButton eventId={event.id} onSuccess={refetch} /> : <></>}
          />
        </li>
      ))}
    </ul>
  )
}