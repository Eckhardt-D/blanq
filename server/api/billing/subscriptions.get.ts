export default defineEventHandler(async (event) => {
  const user = getUserOrThrow(event)
  const config = useRuntimeConfig(event)
  const stripe = useStripe(config.stripeSecretKey)
  const subscriptions = await stripe.getUserSubscriptions({
    user,
  })

  return subscriptions.reduce((acc, sub) => {
    acc.push(...sub.items.data.map(item => item.price.id))
    return acc
  }, [] as string[])
})
