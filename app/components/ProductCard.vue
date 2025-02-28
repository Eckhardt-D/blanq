<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const props = defineProps<{
  active: boolean
  product: {
    title: string
    price: number
    type: 'subscription' | 'payment'
    description: string
    features: string[]
    actionText: string
    actionUrl: string | null
  }
}>()

const loadingCheckout = ref(false)

function setLoading(product: typeof props.product) {
  if (!props.active && product.actionUrl) {
    loadingCheckout.value = true
  }
}
</script>

<template>
  <UiCard :class="active && 'border-blue-500'">
    <UiCardHeader>
      <UiCardTitle class="flex gap-2 items-center">
        {{ product.title }}
        <UiBadge v-if="active" class="border-blue-500" variant="outline">
          active
        </UiBadge>
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
      <UiButton as-child :class="active && 'bg-muted-foreground hover:bg-muted-foreground'" @click="setLoading(product)">
        <a :href="(!active && product.actionUrl) || '#'">
          <Icon v-if="loadingCheckout" icon="radix-icons:update" class="mr-2 h-4 w-4 animate-spin" />
          {{ product.actionText }}
        </a>
      </UiButton>
    </UiCardFooter>
  </UiCard>
</template>
