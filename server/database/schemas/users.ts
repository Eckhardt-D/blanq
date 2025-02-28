import { isNull } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { created_at, deleted_at, updated_at, uuid } from './shared'

export const users = sqliteTable('users', {
  id: uuid,
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false).notNull(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  image: text('image'),
  createdAt: created_at,
  updatedAt: updated_at,
  deletedAt: deleted_at,
}, table => [
  index('users_created_non_deleted_idx').on(table.createdAt).where(isNull(table.deletedAt)),
  index('users_stripe_id_idx').on(table.stripeCustomerId),
])
