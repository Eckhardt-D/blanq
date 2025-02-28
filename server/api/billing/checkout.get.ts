import { z } from 'zod'

const querySchema = z.object({
  type: z.enum(['payment', 'subscription']),
  priceId: z.string(),
})

export default defineEventHandler(async (event) => {
  const user = getUserOrThrow(event)
  const input = await getValidatedQuery(event, querySchema.parse)
  const config = useRuntimeConfig(event)
  const stripe = useStripe(config.stripeSecretKey)

  const session = await stripe.createCheckoutSession({
    successUrl: `${config.public.siteUrl}/api/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${config.public.siteUrl}/app/settings/billing`,
    priceId: input.priceId,
    mode: input.type,
    user,
  })

  if (!session.url) {
    throw createError({
      status: 500,
      message: 'Failed to create checkout session',
    })
  }

  return sendRedirect(event, session.url)
})
