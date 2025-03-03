const appName = 'Blanq'

export default defineAppConfig({
  appName,
  seo: {
    home: {
      title: `${appName} - Free and Open-Source Nuxt Starter Kit`,
      description: 'Blanq is a batteries included Nuxt starter kit, with opinionated defaults that helps you get started quicker. Clone it now, for free.',
    },
  },
  copy: {
    authPageTestimonial: 'Usually the hard part is just starting. Now that it is THIS easy - all focus can be on shipping the product. That is a super power.',
    landing: {
      heading: 'Batteries included Nuxt app starter',
      subHeading: 'Why set up auth, email, queues, payments etc. from scratch every time when you can just clone this repo?',
    },
  },
  navigation: {
    landing: [
      { title: 'Features', to: '/#features' },
      { title: 'Pricing', to: '/#pricing' },
      { title: 'Documentation', to: '/docs' },
      { title: 'Github', to: 'https://github.com/Eckhardt-D/blanq', target: '_blank' },
    ],
  },
  subscriptionBadgeText: 'Pro+',
  products: [
    {
      type: 'subscription' as const,
      priceId: undefined,
      title: 'Free',
      price: 0,
      description: 'Never pay a penny if you do not want to. However, you can support the project by using the real Stripe integration.',
      features: [
        'Unlimited Clones',
        'Unlimited Apps',
        'Unlimited Possibilities',
      ],
      action: 'Get started',
    },
    {
      type: 'payment' as const,
      priceId: 'price_1QxOkQE001hYiK5sRGoDswT3',
      title: 'One Time Sponsor',
      price: 10,
      description: 'Support the project by sponsoring it one time. This also showcases the flow for one time payments.',
      features: [
        'Unlimited Clones',
        'Unlimited Apps',
        'Unlimited Possibilities',
      ],
      action: 'Sponsor now',
    },
    {
      type: 'subscription' as const,
      priceId: 'price_1QxOl7E001hYiK5sxfAaqQTw',
      title: 'Monthly Sponsor',
      price: 5,
      description: 'Support the project by sponsoring it monthly. This also showcases the flow for monthly payments.',
      features: [
        'Unlimited Clones',
        'Unlimited Apps',
        'Unlimited Possibilities',
      ],
      action: 'Start sponsoring',
    },
  ],
  features: [
    {
      title: 'Authentication',
      icon: 'radix-icons:lock-closed',
      description: 'Full authentication flow with email verification and password reset. Includes role management, 2FA, profile management and more - powered by Better Auth.',
    },
    {
      title: 'Payments',
      icon: 'radix-icons:backpack',
      description: 'Stripe integration out of the box. Just add your keys and start accepting payments. No need to set up a backend. Link local product details with Stripe product IDs',
    },
    {
      title: 'Emails',
      icon: 'radix-icons:envelope-closed',
      description: 'Send emails using Mailchannel. This requires a quick spf, dkim and dmarc setup. But it is one time and you are good to go. Send emails for email verification, password reset, welcome emails etc. In development it uses a Docker container to catch all emails.',
    },
    {
      title: 'Database',
      icon: 'radix-icons:table',
      description: 'Uses Drizzle and NuxtHub D1 to provide a simple and easy to use database. No need to set up a database, just start using it.',
    },
    {
      title: 'Queues (Coming Soon)',
      icon: 'radix-icons:layers',
      description: 'Uses CloudFlare KV and Cron to create Queue Producers and Consumers. No need to set up a queue system, just start using it.',
    },
    {
      title: 'UI Components',
      icon: 'radix-icons:cube',
      description: 'Contains all components available for shadcn Vue. You can also update css variables and use TailwindCSS for custom styling',
    },
    {
      title: 'Free',
      icon: 'radix-icons:rocket',
      description: 'Never pay a penny if you do not want to. However, you can always support the project by using the real Stripe integration.',
    },
    {
      title: 'Open Source',
      icon: 'radix-icons:code',
      description: 'You can always check the source code and contribute to the project. Eckhardt-D/blanq on GitHub.',
    },
    {
      title: 'Easy to use',
      icon: 'radix-icons:lightning-bolt',
      description: 'Just clone the repo and start building your app. No need to set up auth, email, queues, payments etc. from scratch.',
    },
  ],
})
