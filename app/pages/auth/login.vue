<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const config = useAppConfig()

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: `${config.appName} | Login`,
  description: 'Login to your Blanq account',
})
</script>

<template>
  <div class="container relative hidden h-dvh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <NuxtLink
      href="/auth/register"
      class="absolute right-4 top-4 md:right-8 md:top-8"
    >
      Create an account
    </NuxtLink>

    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />

      <NuxtLink class="relative z-20 gap-3 flex items-center text-lg font-medium" to="/">
        <Icon icon="radix-icons:crumpled-paper" />
        {{ config.appName }}
      </NuxtLink>

      <div class="relative z-20 mt-auto">
        <AuthTestimonial />
      </div>
    </div>

    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>

          <p class="text-sm text-muted-foreground">
            Enter your email below to get started.
          </p>
        </div>

        <AuthFormLogin />

        <p class="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our
          <a
            href="/terms"
            class="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>
          and
          <a
            href="/privacy"
            class="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  </div>
</template>
