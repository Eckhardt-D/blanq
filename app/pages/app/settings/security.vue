<script lang="ts" setup>
definePageMeta({
  layout: 'settings',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Settings | Security',
  description: 'Update your account password and 2FA settings',
})
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-lg font-medium">
      Security
    </h1>

    <p class="text-sm text-muted-foreground">
      Manage your password and 2FA settings.
    </p>

    <UiSeparator class="mt-3 mb-5" />

    <h3 class="font-medium mb-3">
      Update your password
    </h3>

    <SettingsFormSecurity />

    <h3 class="font-medium mt-10 mb-3">
      Setup Two-Factor Authentication
    </h3>

    <UiBadge>Coming Soon</UiBadge>
  </div>
</template>
