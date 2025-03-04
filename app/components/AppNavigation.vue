<script lang="ts" setup>
const config = useAppConfig()
const userStore = useUserStore()
</script>

<template>
  <nav class="h-[var(--navbar-size)] flex items-center justify-between border-b px-3">
    <div class="flex items-center gap-4">
      <AppBranding to="/app" />
      <UiBadge v-if="userStore.subscriptionInfoLoaded && userStore.user?.subscription?.isSubscribed">
        {{ config.subscriptionBadgeText }}
      </UiBadge>
    </div>

    <div class="flex items-center space-x-3">
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="ghost">
            Menu
          </UiButton>
        </UiDropdownMenuTrigger>

        <UiDropdownMenuContent align="end">
          <UiDropdownMenuItem as-child>
            <NuxtLink class="size-full" to="/app/settings/account">
              Settings
            </NuxtLink>
          </UiDropdownMenuItem>
          <UiDropdownMenuItem
            v-if="userStore.user"
            class="text-destructive dark:text-red-500"
            variant="link"
            @click="userStore.logout"
          >
            Logout
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>

      <AppThemeSelector />
    </div>
  </nav>
</template>
