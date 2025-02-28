<script lang="ts" setup>
const config = useAppConfig()
const route = useRoute()

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: `${config.appName} | Login`,
  description: `Login to your ${config.appName} account`,
})
</script>

<template>
  <AuthPageContainer
    context-switch-link="/auth/register"
    context-switch-text="Create an account"
    form-title="Login to your account"
    form-description="Enter your email and password below to get started."
  >
    <AuthFormLogin :next="(route.query.next as string | undefined)" />

    <div class="my-2 text-center">
      <NuxtLink to="/auth/forgot-password" class="text-sm text-muted-foreground hover:text-primary">
        Forgot your password?
      </NuxtLink>
    </div>
  </AuthPageContainer>
</template>
