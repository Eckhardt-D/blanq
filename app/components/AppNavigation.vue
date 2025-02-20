<script lang="ts" setup>
const config = useAppConfig()
</script>

<template>
  <nav class="flex items-center justify-between border-b py-3 px-3">
    <div>
      <h3 class="text-lg font-semibold">
        {{ config.appName }}
      </h3>
    </div>
    <div>
      <AppThemeSelector />
    </div>
  </nav>
</template>
