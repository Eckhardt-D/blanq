<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const userStore = useUserStore()

onMounted(() => callOnce(async () => {
  try {
    await userStore.sendVerificationEmail()
  }
  catch {
    // Do nothing for now
  }
}))
</script>

<template>
  <div class="py-10">
    <h1 class="text-3xl font-bold tracking-tight text-center">
      Please check your inbox to verify your account.
    </h1>

    <p class="text-center mt-3">
      Having trouble?
      <NuxtLink class="text-muted-foreground underline underline-offset-2" to="/">
        Contact Support
      </NuxtLink>
    </p>
  </div>
</template>
