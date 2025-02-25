<script lang="ts" setup>
</script>

<template>
  <main class="h-dvh flex flex-col">
    <AppNavigation />

    <div class="flex-grow overflow-y-scroll container border-x">
      <slot />
    </div>
  </main>
</template>
