<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import FormFieldBase from './FormFieldBase.vue'

const userStore = useUserStore()
const { toast } = useToast()
const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8).max(255),
  newPasswordConfirm: z.string().min(8).max(255),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (details) => {
  isLoading.value = true

  try {
    await userStore.changePassword(details)
    form.resetForm()
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
      <FormFieldBase v-slot="{ componentField }" name="currentPassword" label="Current Password">
        <UiInput
          id="current-password"
          v-bind="componentField"
          placeholder="Your current password"
          type="password"
          auto-correct="off"
          auto-complete="off"
          :disabled="isLoading"
        />
      </FormFieldBase>

      <FormFieldBase v-slot="{ componentField }" name="newPassword" label="New Password">
        <UiInput
          id="new-password"
          v-bind="componentField"
          placeholder="Your new password"
          type="password"
          auto-capitalize="none"
          auto-complete="password"
          auto-correct="off"
          :disabled="isLoading"
        />
      </FormFieldBase>

      <FormFieldBase v-slot="{ componentField }" name="newPasswordConfirm" label="Confirm New Password">
        <UiInput
          id="new-password-confirm"
          v-bind="componentField"
          placeholder="Re-enter your new password"
          type="password"
          auto-capitalize="none"
          auto-complete="none"
          auto-correct="off"
          :disabled="isLoading"
        />
      </FormFieldBase>

      <div class="flex items-center mt-3 gap-3">
        <UiButton type="submit" :disabled="isLoading">
          <Icon v-if="isLoading" icon="radix-icons:update" class="mr-2 h-4 w-4 animate-spin" />
          Save Changes
        </UiButton>
      </div>
    </form>
  </div>
</template>
