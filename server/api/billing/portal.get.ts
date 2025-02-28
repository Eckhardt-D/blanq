export default defineEventHandler(async (event) => {
  const user = getUserOrThrow(event)
  const config = useRuntimeConfig(event)
  const stripe = useStripe(config.stripeSecretKey)
  const session = await stripe.createCustomerPortalSession({
    returnUrl: `${config.public.siteUrl}/app/settings/billing`,
    user,
  })

  return sendRedirect(event, session.url)
})
