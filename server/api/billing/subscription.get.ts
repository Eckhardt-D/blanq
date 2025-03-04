export default defineEventHandler(async (event) => {
  const user = getUserOrThrow(event)
  const db = useDrizzle()

  if (!user.stripeCustomerId) {
    return {
      isSubscribed: false,
      activeSubscriptionPlans: [],
      cancelledSubscriptionPlans: [],
    }
  }

  const subscriptionItems = await db.select()
    .from(tables.subscriptions)
    .where(
      and(
        eq(tables.subscriptions.userId, user.id),
        not(eq(tables.subscriptions.status, 'inactive')),
      ),
    )

  return {
    isSubscribed: subscriptionItems.length > 0,
    activeSubscriptionPlans: subscriptionItems.filter(sub => sub.status === 'active').map(sub => ({
      stripeMainPriceId: sub.stripeMainPriceId,
      currentPeriodEnd: sub.currentPeriodEnd,
      status: 'active',
    })),
    cancelledSubscriptionPlans: subscriptionItems.filter(sub => sub.status === 'cancelled').map(sub => ({
      stripeMainPriceId: sub.stripeMainPriceId,
      currentPeriodEnd: sub.currentPeriodEnd,
      status: 'cancelled',
    })),
  }
})
