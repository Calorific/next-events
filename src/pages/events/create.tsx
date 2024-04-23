import { CreateEventForm } from '@/features/create-event'
import { CreateEventValues, trpc } from '@/shared/api'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
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
      <CreateEventForm onSubmit={handleSubmit} />
    </div>
  )
}
