<script lang="ts" setup>
import { Button, Text } from '@vue-email/components'
import Base from './base.vue'

defineProps<{
  resetUrl: string
}>()
</script>

<template>
  <Base header-text="Please follow the link to update your password" title="Reset your account password">
    <Text>If you did not request a password reset, please ignore this email.</Text>

    <Button :href="resetUrl" class="bg-blue-500 text-white font-bold p-3 rounded">
      Reset Password
    </Button>
  </Base>
</template>
