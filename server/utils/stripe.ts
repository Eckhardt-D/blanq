import Stripe from 'stripe'

interface CreateCheckoutSessionOptions {
  mode: 'payment' | 'subscription'
  successUrl: string
  cancelUrl: string
  priceId: string
  user: User
}

interface CreateCustomerPortalSessionOptions {
  returnUrl: string
  user: User
}

export function useStripe(secret: string) {
  const stripe = new Stripe(secret)

  async function createCheckoutSession(opts: CreateCheckoutSessionOptions) {
    const checkout: Stripe.Checkout.SessionCreateParams = {
      mode: opts.mode,
      payment_method_types: ['card', 'link'],
      line_items: [{ price: opts.priceId, quantity: 1 }],
      success_url: opts.successUrl,
      cancel_url: opts.cancelUrl,
      currency: 'usd',
      // automatic_tax: { enabled: true },
      // So we can track the user who made the purchase
      // in the initial success redirect
      metadata: { user_id: opts.user.id, price_id: opts.priceId },
    }

    if (opts.user.stripeCustomerId) {
      checkout.customer = opts.user.stripeCustomerId
    }
    else {
      checkout.customer_email = opts.user.email
    }

    return await stripe.checkout.sessions.create(checkout)
  }

  async function getCheckoutSessionById(sessionId: string) {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    })
  }

  async function createCustomerPortalSession(opts: CreateCustomerPortalSessionOptions) {
    return await stripe.billingPortal.sessions.create({
      customer: opts.user.stripeCustomerId!,
      return_url: opts.returnUrl,
    })
  }

  async function getUserSubscriptions(opts: { user: User }) {
    if (!opts.user.stripeCustomerId)
      return []

    const subscriptions = await stripe.subscriptions.list({
      customer: opts.user.stripeCustomerId,
      status: 'active',
    })

    return subscriptions.data
  }

  async function decodeWebhook(request: Request, secret: string) {
    const payload = await request.text()
    const sig = request.headers.get('Stripe-Signature')!

    try {
      return stripe.webhooks.constructEvent(payload, sig, secret)
    }
    catch (err) {
      console.error(err)
      return null
    }
  }

  /**
   * Used to make sure the user's subscription is updated when they pay an invoice.
   * It assumes the subscription already exists, if it does not then nothing happens
   * as that indicates a race condition where the subscription has not been created in Checkout yet.
   */
  async function handleInvoicePaid(invoice: Stripe.Invoice) {
    const db = useDrizzle()

    for (let i = 0; i < invoice.lines.data.length; i++) {
      const lineItem = invoice.lines.data[i]

      if (
        lineItem.type === 'subscription'
        && typeof lineItem.subscription === 'string'
      ) {
        const priceId = lineItem.price?.id
        const periodEnd = lineItem.period.end

        if (!priceId) {
          // TODO: better logging / tracing
          console.error('No price ID found for subscription line item')
          continue
        }

        await db.update(tables.subscriptions).set({
          status: 'active',
          currentPeriodEnd: new Date(periodEnd * 1000),
        }).where(eq(tables.subscriptions.stripeSubscriptionId, lineItem.subscription))
      }
    }
  }

  async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const db = useDrizzle()

    await db.update(tables.subscriptions).set({
      status: 'inactive',
    }).where(eq(tables.subscriptions.stripeSubscriptionId, subscription.id))
  }

  async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
    const db = useDrizzle()

    await db.update(tables.subscriptions).set({
      status: 'cancelled',
      // Ensure that the correct cancellation date is set
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    }).where(eq(tables.subscriptions.stripeSubscriptionId, subscription.id))
  }

  async function handleSubscriptionRenewed(subscription: Stripe.Subscription) {
    if (subscription.status !== 'active') {
      return
    }

    const db = useDrizzle()

    await db.update(tables.subscriptions).set({
      status: 'active',
      // Ensure that the correct cancellation date is set
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    }).where(eq(tables.subscriptions.stripeSubscriptionId, subscription.id))
  }

  return {
    createCheckoutSession,
    getCheckoutSessionById,
    createCustomerPortalSession,
    getUserSubscriptions,
    decodeWebhook,
    handleInvoicePaid,
    handleSubscriptionDeleted,
    handleSubscriptionCancelled,
    handleSubscriptionRenewed,
  }
}
