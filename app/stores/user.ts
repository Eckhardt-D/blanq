import type { User } from '~~/server/database/schemas/users'
import { useToast } from '@/components/ui/toast/use-toast'
import { authClient } from '~~/lib/auth-client'

interface RegisterPayload {
  fullname: string
  email: string
  password: string
  passwordConfirm: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const { toast } = useToast()

  function setUser(newUser: User) {
    user.value = newUser
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

    return (user.value = response.data.user)
  }

  async function logout() {
    await authClient.signOut()
    user.value = null
    return navigateTo('/auth/login')
  }

  return {
    user,
    setUser,
    register,
    logout,
  }
})
