import { prisma } from '../../lib/prisma'
import logger from '../../lib/winston'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, body, method } = req

  switch (method) {
    case "POST":
      try {
        const { item } = body

        const create = await prisma.items.create({
          data: {
            item: item.item
          },
        })

        logger.info('User add item')

        return res.status(200).json({ ok: true })
      } catch (err) {
        logger.error('Server error')
        res.status(500).json({
          status: 'SERVER_ERROR',
          message: 'Server error'
        })
      }
      break
    case "GET":
      const items = await prisma.items.findMany()
      
      logger.info('User get items')

      res.status(200).json(items)
      break
    case "PUT":
      const update = await prisma.items.update({
        where: {
          id: body.item.id,
        },
        data: {
          item: body.item.item
        },
      })

      logger.info(`User update items, id: ${body.item.id}`)

      res.status(200).json({ ok: true })
      break
    case "DELETE":
      const deleteItem = await prisma.items.delete({
        where: {
          id: String(query.id)
        },
      })

      logger.info(`User delete items, id: ${query.id}`)

      res.status(200).json({ ok: true })
      break
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
