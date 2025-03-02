<script lang="ts" setup>
import { Icon } from '@iconify/vue'

defineProps<{
  to?: string
}>()

const config = useAppConfig()
</script>

<template>
  <NuxtLink class="flex items-center gap-2" :to="to ?? '/'">
    <Icon icon="radix-icons:crumpled-paper" class="w-6 h-6" />
    <span class="font-bold text-xl">{{ config.appName }}</span>
  </NuxtLink>
</template>
