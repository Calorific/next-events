import { FC } from 'react'
import { useRouter } from 'next/router';

export const CreateEventButton: FC = () => {
  const router = useRouter()

  return (
    <button onClick={() => router.push('/events/create')} className='h-10 px-6 font-semibold rounded-md bg-green-500 text-white'>
      Создать событие
    </button>
  )
}
