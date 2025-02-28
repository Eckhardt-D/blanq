import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { created_at, updated_at, uuid } from './shared'
import { users } from './users'

export const purchases = sqliteTable('purchases', {
  id: uuid,
  userId: text('user_id').notNull().references(() => users.id),
  stripePriceId: text('stripe_price_id').notNull(),
  createdAt: created_at,
  updatedAt: updated_at,
}, table => [
  index('purchases_created_idx').on(table.createdAt),
])
