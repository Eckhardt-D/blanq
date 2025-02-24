<script lang="ts" setup>
// import Autoplay from 'embla-carousel-vue'
import { Icon } from '@iconify/vue'

const config = useAppConfig()

definePageMeta({
  layout: 'landing',
})

useSeoMeta({
  title: `${config.appName} - Free and Open-Source Nuxt Starter Kit`,
  description: 'Blanq is a batteries included Nuxt starter kit, with opinionated defaults that helps you get started quicker. Clone it now, for free.',
})
</script>

<template>
  <div>
    <div class="container pb-40">
      <div class="text-center max-w-5xl mx-auto mt-40">
        <h1 class="text-7xl font-black tracking-tighter text-balance">
          {{ config.copy.landing.heading }}
        </h1>
        <h3 class="text-muted-foreground text-lg max-w-3xl mx-auto text-balance mt-3">
          {{ config.copy.landing.subHeading }}
        </h3>

        <div class="mt-5">
          <UiButton as-child size="lg">
            <NuxtLink to="/auth/register">
              Get Started
              <Icon icon="radix-icons:arrow-right" class="w-6 h-6" />
            </NuxtLink>
          </UiButton>
        </div>
      </div>

      <div class="mt-40">
        <div class="relative rounded-t-lg border-t border-x h-[calc(100vh/2)] px-4 pt-4">
          <div class="rounded-t-md bg-white h-full overflow-clip select-none pointer-events-none">
            <HalftoneWaves />
          </div>

          <div class="absolute bottom-0 -left-2 -right-2 bg-gradient-to-b from-transparent to-[#f4f4f4] h-14" />
        </div>
      </div>

      <div id="features" class="mt-40">
        <h2 class="text-5xl font-bold tracking-tight">
          Features
        </h2>

        <div class="relative grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div class="absolute -left-4 -right-4 -top-2 h-[1px] shadow-sm border-b" />
          <div class="absolute -left-2 -top-4 -bottom-4 w-[1px] shadow-sm border-r" />
          <div
            v-for="feature in config.features"
            :key="feature.title"
            class="bg-white border rounded-md shadow space-y-4 p-4"
          >
            <div class="flex gap-2 items-center">
              <Icon :icon="feature.icon" />

              <h4 class="font-bold text-xl">
                {{ feature.title }}
              </h4>
            </div>

            <p class="text-muted-foreground text-balance min-h-[126px]">
              {{ feature.description }}
            </p>
          </div>
          <div class="absolute -left-4 -right-4 -bottom-2 shadow-sm h-[1px] border-b" />
          <div class="absolute -right-2 -top-4 -bottom-4 w-[1px] shadow-sm border-r" />
        </div>
      </div>

      <div id="pricing" class="mt-40">
        <h2 class="text-5xl font-bold tracking-tight">
          Pricing
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-10">
          <UiCard v-for="product in config.products" :key="product.title">
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
                <NuxtLink to="/auth/register">
                  {{ product.action }}
                </NuxtLink>
              </UiButton>
            </UiCardFooter>
          </UiCard>
        </div>
      </div>

      <div class="mt-40">
        <h2 class="text-5xl font-bold tracking-tight">
          What People are saying
        </h2>

        <div class="h-[300px] mt-10">
          <UiCarousel
            class="w-full"
            :opts="{ align: 'start', loop: true, active: true }"
          >
            <UiCarouselContent class="-ml-1">
              <UiCarouselItem v-for="i in 10" :key="i" class="pl-1 md:basis-1/3 lg:basis-1/4">
                <div class="p-1">
                  <UiCard>
                    <UiCardContent class="flex gap-3 aspect-square items-center justify-center p-6">
                      <UiAvatar>
                        <UiAvatarImage src="https://randomuser.me/api/portraits/women/26.jpg" />
                        <UiAvatarFallback>SO</UiAvatarFallback>
                      </UiAvatar>
                      <span class="text-lg font-semibold">Kind Words Here...</span>
                    </UiCardContent>
                  </UiCard>
                </div>
              </UiCarouselItem>
            </UiCarouselContent>
            <UiCarouselNext />
          </UiCarousel>
        </div>

        <div class="mt-40">
          <div class="border border-gray-400 rounded-lg space-y-3 p-10 text-center">
            <h2 class="text-5xl tracking-tighter font-bold">
              Get started for free
            </h2>

            <p>
              No credit card needed
            </p>

            <UiButton as-child>
              <NuxtLink to="/auth/register">
                Get Started
                <Icon icon="radix-icons:arrow-right" class="w-6 h-6" />
              </NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </div>

    <footer class="py-10 border-t">
      <div class="container">
        <div class="flex items-end justify-between">
          <div>
            <Icon icon="radix-icons:crumpled-paper" class="w-6 h-6 mb-6" />

            <span class="text-muted-foreground">
              &copy; {{ new Date().getFullYear() }} {{ config.appName }}
            </span>
          </div>

          <div>
            <ul class="flex items-center gap-10 font-medium text-sm">
              <NuxtLink v-for="item in config.navigation.landing" :key="item.title" :to="item.to">
                <li>
                  {{ item.title }}
                </li>
              </NuxtLink>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
