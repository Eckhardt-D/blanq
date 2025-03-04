import { authClient } from '~~/lib/auth-client'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useUserStore()

  if (!store.user || store.cachedSessionExpired()) {
    useNuxtApp()._loadingIndicator?.start()

    const { data: session } = await authClient.useSession(useFetch)

    if (!session?.value?.user) {
      const next = from.path === '/app' ? '' : from.path
      return navigateTo(`/auth/login${next ? `?next=${next}` : ''}`)
    }

    store.setUser(session.value.user as User)

    await store.loadSubscriptionInfo()
      .catch(() => null)

    useNuxtApp()._loadingIndicator?.finish()
  }

  else if (!store.user.emailVerified) {
    if (!to.path.startsWith('/auth/verify-email')) {
      return navigateTo('/auth/verify-email')
    }
  }
})
