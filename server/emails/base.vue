<script lang="ts" setup>
import { Container, Head, Heading, Html, Tailwind } from '@vue-email/components'

defineProps<{
  title: string
  headerText: string
}>()
</script>

<template>
  <Tailwind>
    <Html lang="en" dir="ltr">
      <Head>
        <title>{{ title }}</title>
      </Head>

      <Container class="font-sans">
        <Heading as="h2">
          {{ headerText }}
        </Heading>

        <slot />
      </Container>
    </Html>
  </Tailwind>
</template>
