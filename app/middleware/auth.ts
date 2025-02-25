import { authClient } from '~~/lib/auth-client'

export default defineNuxtRouteMiddleware(async () => {
  const { data: session } = await authClient.useSession(useFetch)

  if (!session?.value?.user) {
    return navigateTo('/auth/login')
  }

  useUserStore().setUser(session.value.user)
})
