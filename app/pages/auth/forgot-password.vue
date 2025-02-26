<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const config = useAppConfig()

useSeoMeta({
  title: `${config.appName} | Forgot Password`,
  description: `Change your ${config.appName} password`,
})
</script>

<template>
  <AuthPageContainer
    context-switch-link="/auth/login"
    context-switch-text="Login instead"
    form-title="Forgot your password?"
    form-description="Enter your email below to reset your password."
  >
    <AuthFormForgotPassword />
  </AuthPageContainer>
</template>
