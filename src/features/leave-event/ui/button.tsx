import { trpc } from '@/shared/api'
import { FC } from 'react'

interface JoinEventButton {
  eventId: number
  onSuccess?: () => void
}

export const LeaveEventButton: FC<JoinEventButton> = ({ eventId, onSuccess }) => {
  const { mutate } = trpc.event.leave.useMutation({ onSuccess })

  return (
    <button onClick={() => mutate({ id: eventId })} className='h-10 px-6 font-semibold rounded-md bg-red-500 text-white'>
      Покинуть
    </button>
  )
}