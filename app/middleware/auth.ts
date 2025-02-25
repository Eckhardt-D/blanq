import { authClient } from '~~/lib/auth-client'

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch)

  if (!session?.value?.user) {
    return navigateTo('/auth/login')
  }

  useUserStore().setUser(session.value.user)

  if (!session.value.user.emailVerified) {
    if (!to.path.startsWith('/auth/verify-email')) {
      return navigateTo('/auth/verify-email')
    }
  }
})
