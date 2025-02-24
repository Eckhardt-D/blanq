<script setup lang="ts">
// TODO: Use ShadCN form stuff
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { z } from 'zod'
import { authClient } from '~~/lib/auth-client'

const isLoading = ref(false)
const { toast } = useToast()

const registerSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
})

const formState = reactive({
  fullname: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

// TODO update to use shadcn form stuff with Zod
async function onSubmit(event: Event) {
  event.preventDefault()

  if (isLoading.value)
    return

  if (formState.password !== formState.passwordConfirm) {
    toast({
      title: 'Password mismatch',
      description: 'The passwords do not match. Please try again.',
      variant: 'destructive',
    })

    return
  }

  const result = registerSchema.safeParse(formState)

  if (!result.success) {
    toast({
      title: 'Invalid form',
      description: 'Please fill in the form correctly.',
      variant: 'destructive',
    })

    return
  }

  const response = await authClient.signUp.email({
    name: result.data.fullname,
    email: result.data.email,
    password: result.data.password,
  })

  if (response.error) {
    toast({
      title: 'Error',
      description: response.error.message,
      variant: 'destructive',
    })

    // return
  }

  // TODO: Success State
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <UiLabel for="email">
            Full name
          </UiLabel>

          <UiInput
            id="fullname"
            v-model="formState.fullname"
            placeholder="Your full name"
            type="text"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>

        <div class="grid gap-1">
          <UiLabel for="email">
            Email
          </UiLabel>

          <UiInput
            id="email"
            v-model="formState.email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>

        <div class="grid gap-1">
          <UiLabel for="password">
            Password
          </UiLabel>

          <UiInput
            id="password"
            v-model="formState.password"
            placeholder="Password"
            type="password"
            :disabled="isLoading"
          />
        </div>

        <div class="grid gap-1">
          <UiLabel for="password-confirm">
            Password Confirm
          </UiLabel>

          <UiInput
            id="password-confirm"
            v-model="formState.passwordConfirm"
            placeholder="Confirm Password"
            type="password"
            :disabled="isLoading"
          />
        </div>

        <UiButton :disabled="isLoading" type="submit">
          <Icon v-if="isLoading" icon="radix-icons:update" class="mr-2 h-4 w-4 animate-spin" />
          Create account
        </UiButton>
      </div>
    </form>
  </div>
</template>
