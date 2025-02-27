<script lang="ts" setup>
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
</script>

<template>
  <main class="h-dvh flex flex-col">
    <AppNavigation />

    <div class="flex-grow overflow-y-scroll container border-x">
      <div class="p-5">
        <UiNavigationMenu>
          <UiNavigationMenuList>
            <UiNavigationMenuItem>
              <UiNavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
                <NuxtLink exact-active-class="bg-muted" to="/app">
                  Dashboard
                </NuxtLink>
              </UiNavigationMenuLink>
            </UiNavigationMenuItem>

            <UiNavigationMenuItem>
              <UiNavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
                <NuxtLink exact-active-class="bg-muted" to="/app/another-page">
                  Another Page
                </NuxtLink>
              </UiNavigationMenuLink>
            </UiNavigationMenuItem>

            <UiNavigationMenuItem>
              <UiNavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
                <NuxtLink exact-active-class="bg-muted" to="/app/third-page">
                  Third Page
                </NuxtLink>
              </UiNavigationMenuLink>
            </UiNavigationMenuItem>
          </UiNavigationMenuList>
        </UiNavigationMenu>
      </div>
      <slot />
    </div>
  </main>
</template>
