import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { created_at, updated_at, uuid } from './shared'

import { users } from './users'

export const sessions = sqliteTable('sessions', {
  id: uuid,
  userId: text('user_id').notNull().references(() => users.id),
  token: text('token').notNull().unique(),
  expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: created_at,
  updatedAt: updated_at,
}, table => [
  index('sessions_user_id_idx').on(table.userId),
])
