import { EventForm } from '@/features/create-event'
import { CreateEventValues, trpc } from '@/shared/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default () => {
  const router = useRouter()
  const [data, setData] = useState<CreateEventValues | null>(null);

  const id = +(router.query.id ?? 0)

  const { data: session } = useSession()

  const { data: eventData } = trpc.event.findUnique.useQuery({
    id,
  })

  useEffect(() => {
    if (!session?.user || eventData?.authorId !== session.user.id)
      router.replace('/').then()
  }, [session, eventData])

  const { mutate } = trpc.event.update.useMutation({
    onSuccess: (data) => {
      router.push(`/events/${data.id}`).then()
    }
  })

  const handleSubmit = (data: CreateEventValues) => {
    mutate({ ...data, date: new Date(data.date), id, })
  }
  useEffect(() => {
    if (eventData) {
      const date = new Date(eventData.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replaceAll('/', '-').split('-')

      eventData.date = [date[2], date[0], date[1]].join('-') as never as Date;
      setData(eventData);
    }
  }, [eventData])

  return (
    <div className='mx-auto max-w-4xl'>
      <EventForm onSubmit={handleSubmit} defaultValues={data ?? undefined} />
    </div>
  )
}
