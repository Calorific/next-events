import { FC } from 'react'
import { useSession } from 'next-auth/react'
import { Logout } from '@/features/logout'
import { CreateEventButton } from '@/features/create-event'
import { LoginButton } from '@/features/login'
import { useRouter } from 'next/router'

export const Header: FC = () => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <header className="pb-[40px]">
      <div className="max-w-[1512px] mx-auto py-[20px] flex justify-between">
        <h1 className="text-[36px] cursor-pointer" onClick={() => router.push('/')}>Events</h1>

        {session?.user ? (
          <div className="flex gap-x-[20px] items-center">
            <Logout name={session?.user?.name ?? ''} />
            <CreateEventButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  )
}
