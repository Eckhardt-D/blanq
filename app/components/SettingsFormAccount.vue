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
  fullname: z.string().min(1).max(255),
  email: z.string().email(),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    fullname: userStore.user!.name,
    email: userStore.user!.email,
  },
})

const onSubmit = form.handleSubmit(async (details) => {
  isLoading.value = true

  try {
    // Causes a redirect if successful, subsequent code will not run reliably
    // await userStore.updateProfile(details)
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
      <FormFieldBase v-slot="{ componentField }" name="fullname" label="Full Name">
        <UiInput
          id="fullname"
          v-bind="componentField"
          placeholder="Your full name"
          type="text"
          auto-correct="off"
          :disabled="isLoading"
        />
      </FormFieldBase>

      <FormFieldBase v-slot="{ componentField }" name="email" label="Email Address">
        <UiInput
          id="email"
          v-bind="componentField"
          placeholder="name@example.com"
          type="email"
          auto-capitalize="none"
          auto-complete="email"
          auto-correct="off"
          :disabled="isLoading"
        />
      </FormFieldBase>

      <UiButton class="mt-3" type="submit" :disabled="isLoading">
        <Icon v-if="isLoading" icon="radix-icons:update" class="mr-2 h-4 w-4 animate-spin" />
        Save Changes
      </UiButton>
    </form>
  </div>
</template>
