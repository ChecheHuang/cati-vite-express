import { db } from '@/lib/db'
import { router, publicProcedure } from '../../trpc'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { Admin } from '@prisma/client'

const adminRouter = router({
  insertAdmin: publicProcedure.mutation(async (req) => {
    const newAdmin = await db.admin.create({
      data: {
        name: 'sunnygo',
        password: '$2b$10$U8..SpEaeNlSnzxWyKnNEOkG0K9uXnYv4bGVry9H5KvoWxWdK/ORy',
      },
    })
    return newAdmin
  }),
  login: publicProcedure
    .input(
      z.object({
        name: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (req): Promise<Omit<Admin, 'password'> | false> => {
      const admin = await db.admin.findFirst({
        where: {
          name: req.input.name,
        },
      })
      if (!admin) return false
      const { password, ...adminWithoutPassword } = admin
      const isPasswordCorrect = await bcrypt.compare(req.input.password, password || '')
      if (!isPasswordCorrect) return false
      return adminWithoutPassword
    }),
})
export default adminRouter
