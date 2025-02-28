import { authClient } from '~~/lib/auth-client'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.useSession(useFetch)

  if (!session?.value?.user) {
    const next = from.path === '/app' ? '' : from.path
    return navigateTo(`/auth/login${next ? `?next=${next}` : ''}`)
  }

  useUserStore().setUser(session.value.user)

  if (!session.value.user.emailVerified) {
    if (!to.path.startsWith('/auth/verify-email')) {
      return navigateTo('/auth/verify-email')
    }
  }
})
