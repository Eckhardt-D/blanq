import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { created_at, updated_at, uuid } from './shared'
import { users } from './users'

export const subscriptions = sqliteTable('subscriptions', {
  id: uuid,
  userId: text('user_id').notNull().references(() => users.id),
  stripeSubscriptionId: text('stripe_subscription_id').unique().notNull(),
  // A reference to the main price ID in the subscription so that we don't
  // need to call stripe always to get it, also allows the subscription to
  // have multiple 'add-on' prices that are not the main price that would
  // need to be fetched from stripe.
  stripeMainPriceId: text('stripe_main_plan_id').notNull(),
  status: text('status').$type<'active' | 'cancelled' | 'inactive'>().default('active').notNull(),
  currentPeriodEnd: integer('current_period_end', { mode: 'timestamp_ms' }).notNull(),
  createdAt: created_at,
  updatedAt: updated_at,
}, table => [
  index('subscriptions_user_id_idx').on(table.userId, table.stripeSubscriptionId),
  index('subscriptions_created_idx').on(table.createdAt),
])
