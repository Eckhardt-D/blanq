import type { User } from '~~/lib/auth-client'
import { useToast } from '@/components/ui/toast/use-toast'
import { authClient } from '~~/lib/auth-client'

interface LoginPayload {
  email: string
  password: string
}

interface BaseSubscription {
  stripeMainPriceId: string
  currentPeriodEnd: Date
}

type ActiveSubscription = BaseSubscription & { status: 'active' }
type CancelledSubscription = BaseSubscription & { status: 'cancelled' }

interface SubscriptionInfo {
  isSubscribed: boolean
  activeSubscriptionPlans: ActiveSubscription[]
  cancelledSubscriptionPlans: CancelledSubscription[]
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

interface UpdateProfilePayload {
  name?: string
  email?: string
}

interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}

type UserWithSubscriptionInfo = User & {
  subscription?: SubscriptionInfo
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserWithSubscriptionInfo | null>(null)
  const subscriptionInfoLoaded = ref(false)
  const userLastUpdated = ref(0)

  const { toast } = useToast()

  function setUser(newUser: User) {
    userLastUpdated.value = Date.now()
    user.value = newUser
  }

  // When the client-side user becomes older than 1 hour
  // force a refetch of the session, instead of on every route
  // change.
  function cachedSessionExpired() {
    return Date.now() - userLastUpdated.value > 3600000
  }

  async function loadSubscriptionInfo() {
    if (!user.value?.stripeCustomerId) {
      subscriptionInfoLoaded.value = true
      return
    }

    const response = await $fetch('/api/billing/subscription', {
      headers: useRequestHeaders(),
    })

    user.value.subscription = {
      isSubscribed: response.isSubscribed,
      activeSubscriptionPlans: response.activeSubscriptionPlans.map(sub => ({
        stripeMainPriceId: sub.stripeMainPriceId,
        currentPeriodEnd: new Date(sub.currentPeriodEnd),
        status: 'active',
      })),
      cancelledSubscriptionPlans: response.cancelledSubscriptionPlans.map(sub => ({
        stripeMainPriceId: sub.stripeMainPriceId,
        currentPeriodEnd: new Date(sub.currentPeriodEnd),
        status: 'cancelled',
      })),
    }

    subscriptionInfoLoaded.value = true
  }

  async function login(payload: LoginPayload, opts?: { next?: string }) {
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

    return navigateTo(opts?.next ?? '/app')
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

    return navigateTo('/auth/verify-email?new=true')
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

  async function updateProfile(data: UpdateProfilePayload) {
    if (!(data.email || data.name)) {
      return
    }

    if (!user.value) {
      return
    }

    const original = user.value

    if (data.name && data.name !== original?.name) {
      const nameUpdateResponse = await authClient.updateUser({
        name: data.name,
      })

      if (nameUpdateResponse.error !== null) {
        toast({
          title: 'Error updating name',
          description: 'Please try again.',
          duration: 4000,
          variant: 'destructive',
        })
      }
      else {
        toast({
          title: 'Name successfully updated',
          duration: 4000,
          variant: 'default',
        })

        user.value.name = data.name
      }
    }

    if (data.email && data.email !== original?.email) {
      const emailUpdateResponse = await authClient.changeEmail({
        newEmail: data.email,
        callbackURL: '/app',
      })

      if (emailUpdateResponse.error !== null) {
        toast({
          title: 'Error updating email',
          description: 'This email may already exist or it is invalid',
          duration: 4000,
          variant: 'destructive',
        })
      }
      else {
        toast({
          title: 'Email successfully updated',
          description: 'Please check your email to verify your new address.',
          duration: 4000,
          variant: 'default',
        })

        user.value.email = data.email
      }
    }
  }

  async function changePassword(payload: ChangePasswordPayload) {
    if (payload.newPassword !== payload.newPasswordConfirm) {
      throw new Error('Passwords do not match.')
    }

    const response = await authClient.changePassword({
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
      revokeOtherSessions: true,
    })

    if (response.error !== null) {
      toast({
        title: 'Error updating password',
        description: 'Please try again.',
        duration: 4000,
        variant: 'destructive',
      })
    }
    else {
      toast({
        title: 'Password successfully updated',
        duration: 4000,
        variant: 'default',
      })
    }
  }

  async function logout() {
    await authClient.signOut()
    user.value = null
    return navigateTo('/auth/login')
  }

  return {
    user,
    setUser,
    userLastUpdated,
    cachedSessionExpired,
    subscriptionInfoLoaded,
    loadSubscriptionInfo,
    login,
    register,
    sendVerificationEmail,
    sendPasswordResetEmail,
    resetPassword,
    updateProfile,
    changePassword,
    logout,
  }
})
