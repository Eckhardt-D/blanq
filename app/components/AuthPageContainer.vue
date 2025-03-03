<script lang="ts" setup>
import { Icon } from '@iconify/vue'

defineProps<{
  contextSwitchLink: '/auth/login' | '/auth/register'
  contextSwitchText: string
  formTitle: string
  formDescription: string
}>()

const config = useAppConfig()
</script>

<template>
  <div class="container relative h-dvh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <NuxtLink
      :href="contextSwitchLink"
      class="absolute right-4 top-4 md:right-8 md:top-8"
    >
      {{ contextSwitchText }}
    </NuxtLink>

    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r md:flex">
      <div class="absolute inset-0 bg-zinc-900" />

      <NuxtLink class="relative z-20 gap-3 flex items-center text-lg font-medium" to="/">
        <Icon icon="radix-icons:crumpled-paper" />
        {{ config.appName }}
      </NuxtLink>

      <div class="relative z-20 mt-auto">
        <AuthTestimonial />
      </div>
    </div>

    <div class="lg:p-8 pt-40 md:pt-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            {{ formTitle }}
          </h1>

          <p class="text-sm text-muted-foreground">
            {{ formDescription }}
          </p>
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>
