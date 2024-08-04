import { RouterOutput } from '@/shared/api'
import { FC } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type EventDetailProps = NonNullable<RouterOutput['event']['findUnique']>

export const EventDetail: FC<EventDetailProps> = ({ title, description, date, participations, authorId }) => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <div>
      <div className="px-4 sm:px-0 flex justify-between">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Информация о событии
        </h3>

        {session?.user?.id === authorId && (
          <button onClick={() => router.push(`/events/edit/${router.query.id ?? 1}`)} className='h-10 px-6 font-semibold rounded-md bg-blue-500 text-white'>
            Редактировать событие
          </button>
        )}
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Название
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Описание
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Дата проведения
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {date?.toLocaleDateString?.() ?? date}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Участники
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {participations.map(({ user }) => user.name).join(", ")}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
