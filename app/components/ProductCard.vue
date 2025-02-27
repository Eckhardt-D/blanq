<script lang="ts" setup>
import { Icon } from '@iconify/vue'

defineProps<{
  product: {
    title: string
    price: number
    type: 'subscription' | 'once'
    description: string
    features: string[]
    actionText: string
    actionUrl: string
  }
}>()
</script>

<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>
        {{ product.title }}
      </UiCardTitle>

      <h3 class="my-2">
        {{ `$${product.price}${product.type === 'subscription' ? '/month' : ''}` }}
      </h3>

      <UiCardDescription>
        {{ product.description }}
      </UiCardDescription>
    </UiCardHeader>

    <UiCardContent>
      <ul class="space-y-2">
        <li v-for="feature in product.features" :key="feature" class="flex items-center gap-2">
          <Icon icon="radix-icons:check" class="w-6 h-6 text-green-500" />

          <span>
            {{ feature }}
          </span>
        </li>
      </ul>
    </UiCardContent>

    <UiCardFooter>
      <UiButton as-child>
        <NuxtLink :to="product.actionUrl">
          {{ product.actionText }}
        </NuxtLink>
      </UiButton>
    </UiCardFooter>
  </UiCard>
</template>
