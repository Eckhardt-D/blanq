<script lang="ts" setup>
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

          <div class="md:hidden md:items-center">
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiButton variant="ghost">
                  Menu
                </UiButton>
              </UiDropdownMenuTrigger>

              <UiDropdownMenuContent align="end">
                <UiDropdownMenuItem
                  v-for="item in config.navigation.landing"
                  :key="item.title"
                  as-child
                >
                  <NuxtLink
                    :to="item.to"
                    :target="item.target"
                    class="size-full"
                  >
                    {{ item.title }}
                  </NuxtLink>
                </UiDropdownMenuItem>

                <UiDropdownMenuItem v-if="!session.data" as-child>
                  <NuxtLink to="/auth/login" class="size-full">
                    Sign in
                  </NuxtLink>
                </UiDropdownMenuItem>

                <UiDropdownMenuItem v-else as-child>
                  <NuxtLink to="/app" class="size-full">
                    Dashboard
                  </NuxtLink>
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </div>

          <div class="hidden md:block">
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

          <div v-if="!session.data" class="hidden md:flex items-center gap-3">
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

            <div class="hidden md:block">
              <AppThemeSelector />
            </div>
          </div>

          <div v-else class="hidden md:flex items-center gap-3">
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
