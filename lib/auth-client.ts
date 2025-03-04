import type { serverAuth } from '~~/server/utils/auth'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<ReturnType<typeof serverAuth>>(),
  ],
})

export type User = typeof authClient.$Infer.Session.user
