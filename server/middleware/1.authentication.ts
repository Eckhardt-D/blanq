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
  const session = await serverAuth().api.getSession({
    headers: event.headers,
  })

  if (session != null) {
    event.context.auth = {
      isAuthenticated: true,
      user: session.user,
    }
  }
  else {
    event.context.auth = {
      isAuthenticated: false,
      user: undefined,
    }
  }
})
