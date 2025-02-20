<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const isLoading = ref(false)

async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <UiLabel for="email">
            Email
          </UiLabel>

          <UiInput
            id="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>

        <div class="grid gap-1">
          <UiLabel for="password">
            Password
          </UiLabel>

          <UiInput
            id="password"
            placeholder="Password"
            type="password"
            :disabled="isLoading"
          />
        </div>

        <div class="grid gap-1">
          <UiLabel for="password-confirm">
            Password Confirm
          </UiLabel>

          <UiInput
            id="password-confirm"
            placeholder="Confirm Password"
            type="password"
            :disabled="isLoading"
          />
        </div>

        <UiButton :disabled="isLoading">
          <Icon v-if="isLoading" icon="radix-icons:update" class="mr-2 h-4 w-4 animate-spin" />
          Create account
        </UiButton>
      </div>
    </form>
  </div>
</template>
