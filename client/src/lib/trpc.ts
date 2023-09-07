import { AppRouter } from '../../../server/src/server'
import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  loggerLink,
  wsLink,
  splitLink,
} from '@trpc/client'

const domain = import.meta.env.VITE_APP_DOMAIN || 'localhost:9000'
export const wsClient = createWSClient({
  url: `ws://${domain}/trpc`,
})
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    // loggerLink(),
    splitLink({
      condition: (op) => {
        return op.type === 'subscription'
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({
        url: `http://${domain}/trpc`,
      }),
    }),
  ],
})
export default trpc
