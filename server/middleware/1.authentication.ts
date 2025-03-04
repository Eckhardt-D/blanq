type AuthContext = {
  isAuthenticated: true
  user: User
} | {
  isAuthenticated: false
  user: undefined
}

declare module 'h3' {
  interface H3EventContext {
    auth: AuthContext
  }
}

export default defineEventHandler(async (event) => {
  // Skip authentication check during prerendering
  if (import.meta.prerender) {
    return
  }

  const session = await serverAuth().api.getSession({
    headers: event.headers,
  })

  if (session != null) {
    event.context.auth = {
      isAuthenticated: true,
      user: session.user as User,
    }
  }
  else {
    event.context.auth = {
      isAuthenticated: false,
      user: undefined,
    }
  }
})
