<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()

// TODO: Handle error by showing useful error page
// 1. What went wrong?
// 2. What the user can do about it?
// 3. How to contact support if nothing else works?
if (route.query.error !== undefined) {
  throw createError({
    statusCode: 400,
    message: `Unexpected request error: ${route.query.error}`,
  })
}

const config = useAppConfig()
const userStore = useUserStore()

useSeoMeta({
  title: `${config.appName} - Home`,
})
</script>

<template>
  <div class="p-5">
    <h1 class="font-bold tracking-tight text-2xl">
      Welcome, {{ userStore.user?.name }}
    </h1>

    <p class="mt-1">
      The world is your oyster.
    </p>
  </div>
</template>
