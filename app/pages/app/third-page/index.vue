<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

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
      The world is your oyster. Take care of it wisely. And you may harvest pearls.
    </p>
  </div>
</template>
