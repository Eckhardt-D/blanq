<script lang="ts" setup>
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator :height="10" :color="true" />

  <NuxtLayout>
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>
