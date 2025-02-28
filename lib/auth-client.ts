import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient()

export type User = typeof authClient.$Infer.Session.user
