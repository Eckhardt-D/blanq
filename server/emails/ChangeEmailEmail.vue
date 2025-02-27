<script lang="ts" setup>
import { Button, Text } from '@vue-email/components'
import Base from './base.vue'

defineProps<{
  resetUrl: string
  newEmail: string
}>()
</script>

<template>
  <Base
    :header-text="`A request to change your account email to ${newEmail} has been made, approve it below.`"
    title="Change your account email address"
  >
    <Text>If you did not request to change your email, please ignore this.</Text>

    <Button :href="resetUrl" class="bg-blue-500 text-white font-bold p-3 rounded">
      Verify New Email
    </Button>
  </Base>
</template>
