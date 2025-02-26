<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { z } from 'zod'
import FormFieldBase from './FormFieldBase.vue'

const props = defineProps<{
  token?: string
}>()

const userStore = useUserStore()
const { toast } = useToast()
const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (details) => {
  if (details.password !== details.passwordConfirm) {
    toast({
      title: 'Passwords do not match',
      description: 'Please ensure both passwords match',
      variant: 'destructive',
    })

    return
  }

  isLoading.value = true

  try {
    if (await userStore.resetPassword({
      token: props.token as string,
      password: details.password,
      passwordConfirm: details.passwordConfirm,
    })) {
      toast({
        title: 'Password reset successfully',
        description: 'You can now login with your new password',
      })
      return navigateTo('/auth/login')
    }
  }

  catch (err) {
    toast({
      title: 'An unexpected error occurred',
      description: (err as Error).message,
      variant: 'destructive',
    })
  }

  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <FormFieldBase v-slot="{ componentField }" name="password" label="Password">
        <UiInput
          id="password"
          v-bind="componentField"
          placeholder="Password"
          type="password"
          :disabled="isLoading"
        />
      </FormFieldBase>

      <FormFieldBase v-slot="{ componentField }" name="passwordConfirm" label="Confirm Password">
        <UiInput
          id="password-confirm"
          v-bind="componentField"
          placeholder="Confirm Password"
          type="password"
          :disabled="isLoading"
        />
      </FormFieldBase>

      <UiButton class="mt-3 w-full" type="submit" :disabled="isLoading">
        <Icon
          v-if="isLoading"
          icon="radix-icons:update"
          class="mr-2 h-4 w-4 animate-spin"
        />
        Reset password
      </UiButton>
    </form>
  </div>
</template>
