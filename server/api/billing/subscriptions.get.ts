export default defineEventHandler(async (event) => {
  const user = getUserOrThrow(event)
  const db = useDrizzle()

  const results = await db.query.subscriptions.findMany({
    columns: { stripeMainPriceId: true },
    where:
      and(
        eq(tables.subscriptions.userId, user.id),
        eq(tables.subscriptions.status, 'active'),
      ),
    orderBy: desc(tables.subscriptions.createdAt),
  })

  return results.map(result => result.stripeMainPriceId)
})
