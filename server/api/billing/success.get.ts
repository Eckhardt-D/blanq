import type { Stripe } from 'stripe'
import { z } from 'zod'

const querySchema = z.object({
  session_id: z.string(),
})

export default defineEventHandler(async (event) => {
  const user = getUserOrThrow(event)
  const input = await getValidatedQuery(event, querySchema.parse)
  const config = useRuntimeConfig(event)
  const stripe = useStripe(config.stripeSecretKey)
  const session = await stripe.getCheckoutSessionById(input.session_id)

  if (!session) {
    throw createError({
      status: 404,
      message: 'Session not found',
    })
  }

  const sessionUserId = session.metadata?.user_id
  const subscription = session.subscription as Stripe.Subscription

  if (sessionUserId !== user.id) {
    throw createError({
      status: 403,
      message: 'Forbidden',
    })
  }

  if (session.status === 'complete') {
    const db = useDrizzle()

    await db.update(tables.users).set({
      stripeCustomerId: session.customer as string,
    }).where(eq(tables.users.id, user.id))

    // TODO: check that we have the priceID in our config
    const mainPriceId = session.metadata?.price_id

    if (mainPriceId == null) {
      console.error(`Checkout session created for ${user.email} but no price ID was found`)

      return createError({
        status: 500,
        message: 'There was a fatal error in verifying the subscription,'
          + ' please contact support. The issue relates to not finding a valid product to subscribe to.',
      })
    }

    if (session.mode === 'subscription') {
      await db.insert(tables.subscriptions).values({
        userId: user.id,
        stripeSubscriptionId: subscription.id,
        stripeMainPriceId: mainPriceId,
        // Denoted in seconds (unix timestamp), JS Date expects milliseconds
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      })
    }
    else if (session.mode === 'payment') {
      await db.insert(tables.purchases).values({
        userId: user.id,
        stripePriceId: mainPriceId,
      })
    }
  }

  return sendRedirect(event, '/app/settings/billing')
})
