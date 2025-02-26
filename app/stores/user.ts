import type { User } from '~~/server/database/schemas/users'
import { useToast } from '@/components/ui/toast/use-toast'
import { authClient } from '~~/lib/auth-client'

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  fullname: string
  email: string
  password: string
  passwordConfirm: string
}

interface ResetPasswordPayload {
  token: string
  password: string
  passwordConfirm: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const { toast } = useToast()

  function setUser(newUser: User) {
    user.value = newUser
  }

  async function login(payload: LoginPayload) {
    const response = await authClient.signIn.email({
      email: payload.email,
      password: payload.password,
    })

    if (response.error != null) {
      toast({
        title: 'Error signing in',
        description: 'Please check your email and password and try again.',
        duration: 4000,
        variant: 'destructive',
      })
      return null
    }

    return navigateTo('/app')
  }

  async function register(payload: RegisterPayload) {
    const response = await authClient.signUp.email({
      name: payload.fullname,
      email: payload.email,
      password: payload.password,
      callbackURL: '/app',
    })

    if (response.error != null) {
      toast({
        title: 'Error signing up',
        description: 'Please check your email and password and try again.',
        duration: 4000,
        variant: 'destructive',
      })
      return null
    }

    toast({
      title: 'Success',
      description: 'Please check your email to verify your account.',
      duration: 4000,
      variant: 'default',
    })

    return navigateTo('/app')
  }

  async function sendVerificationEmail() {
    if (!user.value) {
      throw new Error('Invalid session, could not send verification email.')
    }

    await authClient.sendVerificationEmail({
      email: user.value.email,
      callbackURL: '/app',
    })
  }

  async function sendPasswordResetEmail(email: string) {
    await authClient.forgetPassword({ email, redirectTo: '/auth/reset-password' })
  }

  async function resetPassword(payload: ResetPasswordPayload) {
    if (payload.password !== payload.passwordConfirm) {
      throw new Error('Passwords do not match.')
    }

    await authClient.resetPassword({
      token: payload.token,
      newPassword: payload.password,
    })

    return true
  }

  async function logout() {
    await authClient.signOut()
    user.value = null
    return navigateTo('/auth/login')
  }

  return {
    user,
    setUser,
    login,
    register,
    sendVerificationEmail,
    sendPasswordResetEmail,
    resetPassword,
    logout,
  }
})
