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

const original = userStore.user

const formSchema = toTypedSchema(z.object({
  fullname: z.string().min(1).max(255),
  email: z.string().email(),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    fullname: original!.name,
    email: original!.email,
  },
})

const emailHasBeenAltered = computed(() => {
  return form.values.email !== original!.email
})

const onSubmit = form.handleSubmit(async (details) => {
  isLoading.value = true

  try {
    await userStore.updateProfile({
      name: details.fullname,
      email: details.email,
    })
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

function reset() {
  form.resetForm({
    values: {
      fullname: original!.name,
      email: original!.email,
    },
  })
}
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

      <FormFieldBase name="email" label="Email Address">
        <template #default="{ componentField }">
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
        </template>

        <template v-if="emailHasBeenAltered" #description>
          <UiFormDescription>
            An email will be sent to your current email to approve the change.
            Then a verification email will be sent to the new email.
          </UiFormDescription>
        </template>
      </FormFieldBase>

      <div class="flex items-center mt-3 gap-3">
        <UiButton type="submit" :disabled="isLoading">
          <Icon v-if="isLoading" icon="radix-icons:update" class="mr-2 h-4 w-4 animate-spin" />
          Save Changes
        </UiButton>
        <UiButton variant="link" @click.prevent="reset">
          Reset
        </UiButton>
      </div>
    </form>
  </div>
</template>
