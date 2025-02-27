<script lang="ts" setup>
definePageMeta({
  layout: 'settings',
  middleware: 'auth',
})

const config = useAppConfig()
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
        :product="{
          ...product,
          actionUrl: `/api/billing/checkout?priceId=${product.priceId}`,
          actionText: product.action,
        }"
      />
    </div>

    <UiSeparator class="my-5" />

    <h3 class="font-medium">
      Transaction history
    </h3>

    <p class="text-muted-foreground text-sm">
      Manage your billing with Stripe Portal
    </p>

    <UiButton class="mt-3">
      Open Portal
    </UiButton>
  </div>
</template>
