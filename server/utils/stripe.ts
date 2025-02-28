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

  return {
    createCheckoutSession,
    getCheckoutSessionById,
    createCustomerPortalSession,
    getUserSubscriptions,
  }
}
