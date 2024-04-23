// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma, User } from '@/server/db'

type Data = User[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
  const users = await prisma.user.findMany()
  res.status(200).json(users)
}
