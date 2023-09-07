import { router } from '../trpc'
import adminRouter from './admin'
import todoRouter from './todo'

export const appRouter = router({
  adminRouter,
  todoRouter,
})
