<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { z } from 'zod'
import FormFieldBase from './FormFieldBase.vue'

const userStore = useUserStore()
const { toast } = useToast()
const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const passwordResetSent = ref(false)

const disabled = computed(() => passwordResetSent.value || isLoading.value)

const onSubmit = form.handleSubmit(async (details) => {
  if (passwordResetSent.value) {
    return
  }

  isLoading.value = true

  try {
    await userStore.sendPasswordResetEmail(details.email)
    passwordResetSent.value = true

    toast({
      title: 'Password reset email sent',
      description: 'Check your inbox for further instructions',
    })

    setTimeout(() => {
      passwordResetSent.value = false
    }, 5000)
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
      <FormFieldBase
        v-slot="{ componentField }"
        name="email"
        label="Email Address"
      >
        <UiInput
          id="email"
          v-bind="componentField"
          placeholder="name@example.com"
          type="email"
          auto-capitalize="none"
          auto-complete="email"
          auto-correct="off"
          :disabled
        />
      </FormFieldBase>

      <UiButton class="mt-3 w-full" type="submit" :disabled>
        <Icon
          v-if="isLoading"
          icon="radix-icons:update"
          class="mr-2 h-4 w-4 animate-spin"
        />
        Send password reset
      </UiButton>
    </form>
  </div>
</template>
