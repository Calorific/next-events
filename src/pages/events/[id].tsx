import { EventDetail } from '@/entities/event'
import { trpc } from '@/shared/api'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default () => {
  const { query } = useRouter()
  const session = useSession()
  const { data, isLoading } = trpc.event.findUnique.useQuery({ id: Number(query.id) })

  if (isLoading)
    return 'Loading...'

  if (session.status === 'unauthenticated')
    return "Forbidden"

  if (!data)
    return 'No data'



  return <EventDetail {...data} />
}