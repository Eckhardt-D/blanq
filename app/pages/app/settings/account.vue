<script lang="ts" setup>
definePageMeta({
  layout: 'settings',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Settings | Account',
  description: 'Update your name or email address',
})
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-lg font-medium">
      Account
    </h1>

    <p class="text-sm text-muted-foreground">
      Update your name or email address.
    </p>

    <UiSeparator class="mt-3 mb-5" />

    <SettingsFormAccount />
  </div>
</template>
