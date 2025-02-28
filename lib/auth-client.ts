import { createAuthClient } from 'better-auth/vue'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import type { serverAuth } from '~~/server/utils/auth'

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<ReturnType<typeof serverAuth>>()],
})

export type User = typeof authClient.$Infer.Session.user
