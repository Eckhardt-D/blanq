<script lang="ts" setup>
import { authClient } from '~~/lib/auth-client'

definePageMeta({
  layout: 'auth',
})

const session = authClient.useSession()
</script>

<template>
  <div class="py-10">
    <h1 class="text-3xl font-bold tracking-tight text-center max-w-2xl mx-auto">
      Your request to change your email {{ session.data?.user ? `to ${session.data.user.email}` : '' }} has been accepted, please check your new email inbox to verify it.
    </h1>

    <p class="text-center mt-3">
      <NuxtLink class="text-muted-foreground underline underline-offset-2" to="/">
        Go Home
      </NuxtLink>
    </p>
  </div>
</template>
