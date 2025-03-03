import type { serverAuth } from '~~/server/utils/auth'
import { customSessionClient, inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<ReturnType<typeof serverAuth>>(),
    customSessionClient<ReturnType<typeof serverAuth>>(),
  ],
})

// BUG: having both additionalFields and customSessionClient
// causes type info on additional fields to be lost...
export type User = typeof authClient.$Infer.Session.user & {
  stripeCustomerId: string | null | undefined
}
