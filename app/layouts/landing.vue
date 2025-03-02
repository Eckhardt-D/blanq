<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { authClient } from '~~/lib/auth-client'

const config = useAppConfig()
const session = authClient.useSession()
</script>

<template>
  <main class="bg-[#f4f4f4] dark:bg-background min-h-dvh">
    <div class="container">
      <div class="py-5">
        <nav class="flex items-center justify-between border rounded-lg bg-white dark:bg-background p-3">
          <AppBranding />

          <div>
            <ul class="flex items-center gap-10 font-medium text-sm">
              <NuxtLink
                v-for="item in config.navigation.landing"
                :key="item.title"
                :to="item.to"
                :target="item.target"
              >
                <li>
                  {{ item.title }}
                </li>
              </NuxtLink>
            </ul>
          </div>

          <div v-if="!session.data" class="flex items-center gap-3">
            <UiButton as-child variant="ghost">
              <NuxtLink to="/auth/login">
                Sign in
              </NuxtLink>
            </UiButton>

            <UiButton as-child>
              <NuxtLink to="/auth/register">
                Get Started
              </NuxtLink>
            </UiButton>

            <AppThemeSelector />
          </div>

          <div v-else class="flex items-center gap-3">
            <UiButton as-child>
              <NuxtLink to="/app">
                Dashboard
              </NuxtLink>
            </UiButton>

            <AppThemeSelector />
          </div>
        </nav>
      </div>
    </div>

    <slot />
  </main>
</template>
