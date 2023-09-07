import { observable } from '@trpc/server/observable'
import { router, publicProcedure, eventEmitter } from '../../trpc'
import { z } from 'zod'
import { db } from './db'
const todoProcedure = publicProcedure.input(
  z.object({
    id: z.string(),
  })
)

const todoRouter = router({
  getTodoList: publicProcedure.query(async () => await db.todos.findMany()),
  getTodo: todoProcedure.query(async (req) => await db.todos.findById(req.input.id)),
  createTodo: publicProcedure.input(z.object({ todo: z.string() })).mutation(async (req) => await db.todos.create(req.input)),
  updateTodo: todoProcedure.mutation(async (req) => {
    // console.log(req.ctx.isAdmin);
    const update = await db.todos.update(req.input.id)
    eventEmitter.emit('update', req.input.id)
    return update
  }),
  deleteTodo: todoProcedure.output(z.boolean()).mutation(async (req) => await db.todos.delete(req.input.id)),
  onUpdate: publicProcedure.subscription(() => {
    return observable<string>((emit) => {
      eventEmitter.on('update', emit.next)

      return () => {
        eventEmitter.off('update', emit.next)
      }
    })
  }),
})
export default todoRouter
