import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ name: 'John Doe' })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, body, method } = req

  switch (method) {
    case "POST":
      try {
        const { item } = body

        const create = await prisma.items.create({
          data: {
            item
          },
        })

        return res.status(200).json({ ok: true })
      } catch (err) {
        res.status(500).json({
          status: 'SERVER_ERROR',
          message: 'Server error'
        })
      }
      break
    case "GET":
      const items = await prisma.items.findMany()

      res.status(200).json(kelas)
      break
    case "PUT":
      const checkUpdate = await prisma.kelas.findFirst({
        where: {
          nama_kelas: body.kelas.nama_kelas,
        },
      })

      if (checkUpdate && checkUpdate.id !== body.kelas.id) return res.status(200).json({ error: true, message: "Nama kelas sudah ada!" })

      const updateKelas = await prisma.kelas.update({
        where: {
          id: body.kelas.id,
        },
        data: {
          ruangan_id: body.kelas.ruangan_id,
          nama_kelas: body.kelas.nama_kelas,
          keterangan: body.kelas.keterangan,
          status_aktif: body.kelas.status_aktif,
          updated_at: DateTime.local().plus({ hours: 7 }).toString(),
        },
      })

      res.status(200).json({ ok: true })
      break
    case "DELETE":
      const deleteKelas = await prisma.kelas.delete({
        where: {
          id: query.id,
        },
      })

      res.status(200).json({ ok: true })
      break
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
