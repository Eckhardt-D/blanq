<script lang="ts" setup>
import { cn } from '@/lib/utils'

const route = useRoute()

const navigation = [
  {
    title: 'Account',
    description: 'Update your name or email address.',
    href: '/app/settings/account',
  },
  {
    title: 'Security',
    description: 'Update your password or enable two-factor authentication.',
    href: '/app/settings/security',
  },
  {
    title: 'Billing',
    description: 'Update your billing information or view invoices.',
    href: '/app/settings/billing',
  },
]
</script>

<template>
  <main class="flex flex-col">
    <AppNavigation class="!px-10 shrink-0" />

    <div class="px-10 mt-5">
      <UiBreadcrumb>
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink as-child>
              <NuxtLink to="/app">
                Dashboard
              </NuxtLink>
            </UiBreadcrumbLink>
          </UiBreadcrumbItem>

          <UiBreadcrumbSeparator />

          <UiBreadcrumbItem>
            <UiBreadcrumbPage>
              Settings
            </UiBreadcrumbPage>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>
    </div>

    <div class="space-y-6 px-10 pt-5 pb-16">
      <SettingsHeader v-once />

      <UiSeparator />

      <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside class="-mx-4 lg:w-1/5">
          <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <UiButton
              v-for="item in navigation"
              :key="item.href"
              variant="ghost"
              :class="cn(
                'w-full text-left justify-start',
                route.path === item.href && 'bg-muted hover:bg-muted',
              )"
              as-child
            >
              <NuxtLink :to="item.href">
                {{ item.title }}
              </NuxtLink>
            </UiButton>
          </nav>
        </aside>

        <div class="flex-1">
          <div class="space-y-6">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
