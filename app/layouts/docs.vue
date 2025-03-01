<script lang="ts" setup>
const { data } = await useAsyncData('docs-navigation', async () => {
  return await queryCollectionNavigation('docs')
})

const config = useAppConfig()
</script>

<template>
  <UiSidebarProvider>
    <UiSidebar>
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupLabel class="h-[var(--navbar-size)]">
            {{ config.appName }} Documentation
          </UiSidebarGroupLabel>

          <UiSidebarGroupContent>
            <UiSidebarMenu v-if="data">
              <UiSidebarMenuItem v-for="entry in data[0]!.children!" :key="entry.title">
                <UiSidebarMenuButton class="hover:bg-muted" as-child>
                  <NuxtLink exact-active-class="bg-muted" :to="entry.path">
                    {{ entry.title }}
                  </NuxtLink>
                </UiSidebarMenuButton>
                <UiSidebarMenuSub>
                  <UiSidebarMenuSubItem v-for="(subEntry, i) in entry.children!" :key="subEntry.path">
                    <UiSidebarMenuButton v-if="i > 0" class="hover:bg-muted" as-child>
                      <NuxtLink exact-active-class="bg-muted" :to="subEntry.path">
                        {{ subEntry.title }}
                      </NuxtLink>
                    </UiSidebarMenuButton>
                  </UiSidebarMenuSubItem>
                </UiSidebarMenuSub>
              </UiSidebarMenuItem>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
      </UiSidebarContent>
    </UiSidebar>

    <main class="w-full">
      <nav class="border-b h-[var(--navbar-size)] px-5 flex items-center justify-between">
        <AppBranding />
        <AppThemeSelector />
      </nav>

      <div class="p-5">
        <slot />
      </div>
    </main>
  </UiSidebarProvider>
</template>
