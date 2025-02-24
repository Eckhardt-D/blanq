<script lang="ts" setup>
import { Button, Text } from '@vue-email/components'
import Base from './base.vue'

defineProps<{
  confirmationLink: string
}>()
</script>

<template>
  <Base header-text="Please click the button below to confirm your account" title="Verify Your Account">
    <Text>If you did not sign up for an account, please ignore this email.</Text>

    <Button :href="confirmationLink" class="bg-blue-500 text-white font-bold p-3 rounded">
      Verify Account
    </Button>
  </Base>
</template>
