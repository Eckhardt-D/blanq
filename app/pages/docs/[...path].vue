<script lang="ts" setup>
import { Icon } from '@iconify/vue'

definePageMeta({
  layout: 'docs',
})

const route = useRoute()

const { data: info } = await useAsyncData(route.path, () => {
  return Promise.all([
    queryCollectionItemSurroundings('docs', route.path),
    queryCollection('docs').path(route.path).first(),
  ])
}, {
  transform: ([surroundings, page]) => {
    return {
      surroundings,
      page,
    }
  },
})

useSeoMeta({
  title: info.value?.page?.seo?.title || 'Blanq',
  description: info.value?.page?.seo?.description || 'Not Found',
})

defineOgImageComponent('NuxtSeo', {
  title: info.value?.page?.seo?.title || 'Blanq',
  description: info.value?.page?.seo?.description || 'Not Found',
})
</script>

<template>
  <ContentRenderer v-if="info?.page" :value="info.page" class="prose lg:prose-lg dark:prose-invert" />

  <div v-if="info?.surroundings" class="my-10 prose flex items-center justify-between">
    <div>
      <div v-if="info?.surroundings[0]">
        <NuxtLink :to="info.surroundings[0].path" class="text-blue-500 hover:underline">
          <Icon icon="radix-icons:arrow-left" class="w-4 h-4 inline-block" />
          {{ info.surroundings[0].title }}
        </NuxtLink>
      </div>
    </div>

    <div>
      <div v-if="info?.surroundings[1]">
        <NuxtLink :to="info.surroundings[1].path" class="text-blue-500 hover:underline">
          {{ info.surroundings[1].title }}
          <Icon icon="radix-icons:arrow-right" class="w-4 h-4 inline-block" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
