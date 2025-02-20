<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const config = useAppConfig()
</script>

<template>
  <main class="bg-[#f4f4f4] min-h-dvh">
    <div class="container">
      <div class="py-5">
        <nav class="flex items-center justify-between border rounded-lg bg-white p-3">
          <div class="flex items-center gap-2">
            <Icon icon="radix-icons:crumpled-paper" class="w-6 h-6" />
            <span class="font-bold text-xl">{{ config.appName }}</span>
          </div>

          <div>
            <ul class="flex items-center gap-10 font-medium text-sm">
              <NuxtLink v-for="item in config.navigation.landing" :key="item.title" :to="item.to">
                <li>
                  {{ item.title }}
                </li>
              </NuxtLink>
            </ul>
          </div>

          <div class="flex items-center gap-3">
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
          </div>
        </nav>
      </div>

      <slot />
    </div>
  </main>
</template>
