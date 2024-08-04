import { EventForm } from '@/features/create-event'
import { CreateEventValues, trpc } from '@/shared/api'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default () => {
  const router = useRouter()

  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.user)
      router.push('/').then()
  }, [session])

  const { mutate } = trpc.event.create.useMutation({
    onSuccess: (data) => {
      router.push(`/events/${data.id}`).then()
    }
  })

  const handleSubmit = (data: CreateEventValues) => {
    mutate(data)
  }

  return (
    <div className='mx-auto max-w-4xl'>
      <EventForm onSubmit={handleSubmit} />
    </div>
  )
}
