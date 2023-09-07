import { initTRPC, inferAsyncReturnType, TRPCError } from '@trpc/server'
import { EventEmitter } from 'stream'
import { createContext } from './context'
export const t = initTRPC.context<inferAsyncReturnType<typeof createContext>>().create()
export const router = t.router
export const publicProcedure = t.procedure
export const eventEmitter = new EventEmitter()

const isAdminMiddware = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { user: { id: 1 } } })
})

export const adminProcedure = t.procedure.use(isAdminMiddware)
