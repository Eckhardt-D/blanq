<script lang="ts" setup>
import { Icon } from '@iconify/vue'

definePageMeta({
  layout: 'settings',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Settings | Billing',
  description: 'Update your billing information or view invoices',
})

const config = useAppConfig()
const loadingPortal = ref(false)
const userStore = useUserStore()

function openPortal() {
  loadingPortal.value = true
  window.location.href = '/api/billing/portal'
}
</script>

<template>
  <div class="max-w-5xl">
    <h1 class="text-lg font-medium">
      Billing
    </h1>

    <p class="text-sm text-muted-foreground">
      Update your billing information or view invoices.
    </p>

    <UiSeparator class="mt-3 mb-5" />

    <h3 class="font-medium">
      Your subscription options
    </h3>

    <p class="text-muted-foreground text-sm">
      Get started with one of our options below.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-5">
      <ProductCard
        v-for="product in config.products"
        :key="product.title"
        :active="!!product.priceId && !!userStore.user?.subscription?.activeSubscriptionPlans.some(plan => plan.stripeMainPriceId === product.priceId)"
        :product="{
          ...product,
          actionUrl: product.priceId ? `/api/billing/checkout?priceId=${product.priceId}&type=${product.type}` : null,
          actionText: product.action,
        }"
      />
    </div>

    <div v-if="userStore.user?.subscription?.cancelledSubscriptionPlans.length" class="py-4">
      You have some <span class="font-bold">cancelled subscriptions</span> that will expire soon, open Portal below to manage them.
    </div>

    <UiSeparator class="my-5" />

    <h3 class="font-medium">
      Manage your billing
    </h3>

    <p class="text-muted-foreground text-sm">
      Change your payment method, cancel plans or view invoices.
    </p>

    <UiButton class="mt-3" :disabled="loadingPortal || !userStore.user?.stripeCustomerId" @click="openPortal">
      <Icon
        v-if="loadingPortal"
        icon="radix-icons:update"
        class="mr-2 h-4 w-4 animate-spin"
      />
      Open Portal
    </UiButton>
  </div>
</template>
