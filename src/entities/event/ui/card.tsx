import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface EventCardProps {
  id: number;
  title: string;
  description: string | null;
  date: Date;
  action: ReactNode;
}

export const EventCard = ({
  id,
  title,
  description,
  date,
  action,
}: EventCardProps) => {
  return (
    <div className="flex font-sans rounded-lg shadow-xl overflow-hidden">
      <div className="flex-none w-48 relative">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex-auto p-6">
        <div className="flex flex-wrap -mt-6 pt-6 pb-6">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            {title}
          </h1>
          <div className="text-lg font-semibold text-slate-500">
            {date.toDateString()}
          </div>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
            {description}
          </div>
        </div>
        <div className="flex space-x-4 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            {action}
            <Link
              href={`/events/${id}`}
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 align-middle leading-10"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
