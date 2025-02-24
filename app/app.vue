<script lang="ts" setup>
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>
