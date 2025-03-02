<script lang="ts" setup>
import { cn } from '@/lib/utils'

const props = defineProps<{
  class: string
}>()
</script>

<template>
  <pre :class="cn('not-prose p-4 overflow-x-scroll no-scrollbar border rounded-lg bg-slate-100 dark:bg-slate-700', props.class)"><slot /></pre>
</template>

<style scoped>
pre code .line {
  display: block;
}

.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
