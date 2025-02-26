<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const route = useRoute()
const config = useAppConfig()

if (!route.query.token) {
  throw createError({
    statusCode: 400,
    message: 'Invalid token, could not reset password',
  })
}

useSeoMeta({
  title: `${config.appName} | Reset Password`,
  description: `Reset your ${config.appName} password`,
})
</script>

<template>
  <AuthPageContainer
    context-switch-link="/auth/login"
    context-switch-text="Login instead"
    form-title="Reset your password"
    form-description="Enter your new password below to reset your account."
  >
    <AuthFormResetPassword :token="(route.query.token as string)" />
  </AuthPageContainer>
</template>
