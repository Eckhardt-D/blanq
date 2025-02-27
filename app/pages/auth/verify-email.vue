<script lang="ts" setup>
import { useToast } from '@/components/ui/toast/use-toast'

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const { toast } = useToast()
const userStore = useUserStore()
const route = useRoute()
const isSent = ref(false)

watch(() => isSent.value, (value) => {
  if (value) {
    setTimeout(() => {
      isSent.value = false
    }, 5000)
  }
})

if (route.query?.new === 'true') {
  await userStore.sendVerificationEmail()
  isSent.value = true
  // Remove ?new=true from the URL
  await useRouter().replace({ query: {} })
}

async function resendVerificationEmail() {
  if (isSent.value) {
    return toast({
      title: 'Please wait 5 seconds before resending',
      variant: 'destructive',
    })
  }

  try {
    isSent.value = true
    await userStore.sendVerificationEmail()
    toast({
      title: 'Email sent',
      description: 'Please check your inbox to verify your account.',
    })
  }
  catch {
    // Do nothing for now
  }
}
</script>

<template>
  <div class="py-10">
    <h1 class="text-3xl font-bold tracking-tight text-center">
      Please check your inbox to verify your account.
    </h1>

    <p class="text-center mt-3">
      Didn't receive the email?
      <UiButton variant="link" @click="resendVerificationEmail">
        Click here to resend
      </UiButton>
    </p>

    <p class="text-center mt-3">
      Having trouble?
      <NuxtLink class="text-muted-foreground underline underline-offset-2" to="/">
        Contact Support
      </NuxtLink>
    </p>
  </div>
</template>
