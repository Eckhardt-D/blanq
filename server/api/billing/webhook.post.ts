export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const stripe = useStripe(config.stripeSecretKey)
  const result = await stripe.decodeWebhook(toWebRequest(event), config.stripeWebhookSecret)

  if (result == null) {
    setResponseStatus(event, 400)
    return 'Invalid webhook payload'
  }

  try {
    switch (result.type) {
      case 'invoice.paid': {
        await stripe.handleInvoicePaid(result.data.object)
        break
      }
      case 'customer.subscription.deleted': {
        await stripe.handleSubscriptionDeleted(result.data.object)
        break
      }
      case 'customer.subscription.updated': {
        if (result.data.object.cancel_at_period_end) {
          await stripe.handleSubscriptionCancelled(result.data.object)
          break
        }
        else {
          await stripe.handleSubscriptionRenewed(result.data.object)
        }
      }
    }

    setResponseStatus(event, 200)
    return 'ok'
  }
  catch (err) {
    // TODO: Better logging
    console.error(err)
    setResponseStatus(event, 500)
    return `Error handling webhook ${(err as Error).message}`
  }
})
