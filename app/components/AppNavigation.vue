<script lang="ts" setup>
const config = useAppConfig()
const userStore = useUserStore()
</script>

<template>
  <nav class="h-[var(--navbar-size)] flex items-center justify-between border-b px-3">
    <div>
      <h3 class="text-lg font-semibold">
        {{ config.appName }}
      </h3>
    </div>
    <div class="flex gap-2">
      <UiButton v-if="userStore.user" class="text-destructive" variant="link" @click="userStore.logout">
        Logout
      </UiButton>

      <AppThemeSelector />
    </div>
  </nav>
</template>
