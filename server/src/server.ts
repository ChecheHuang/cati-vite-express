import loadEnv from './lib/env'
loadEnv()
import 'dotenv/config'
import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import path from 'path'
import { createContext } from './context'
import { appRouter } from './routes'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
import ws from 'ws'

const app = express()
app.use(cors())

const publicPath = path.join(path.resolve(__dirname, '..'), '/client')
app.use(express.static(publicPath))

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

app.get('/*', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.use((req: Request, res: Response, next: NextFunction) => next(createError(404, 'Endpoint not found')))

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  let errorMessage = 'An unknown error occurred: '
  let statusCode = 500
  if (err instanceof createError.HttpError) {
    statusCode = err.status
    errorMessage = err.message
  }
  res.status(statusCode).json({ error: errorMessage })
})
export const port = process.env.PORT || 8080

const server = app.listen(port, () => {
  console.log(`⚡️[${process.env.NODE_ENV}]: Server is running at http://localhost:${port}`)
})
applyWSSHandler({
  wss: new ws.Server({ server }),
  router: appRouter,
  createContext,
})
export type AppRouter = typeof appRouter
