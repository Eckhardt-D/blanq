import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/index.css'],
  devtools: { enabled: true },
  googleFonts: {
    families: {
      Geist: {
        wght: '100..900',
      },
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontaine',
    '@nuxthub/core',
  ],
  hub: {
    database: true,
  },
  colorMode: {
    storageKey: 'blanq-color-mode',
    classSuffix: '',
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: './app/components/ui',
  },
  runtimeConfig: {
    mailChannelsBaseUrl: '',
    mailChannelsApiKey: '',
    mailSenderName: '',
    mailSenderEmail: '',
  },
  nitro: {
    rollupConfig: {
      // @ts-expect-error type instantiation is excessively deep and possibly infinite.
      plugins: [vue()],
    },
  },
})
