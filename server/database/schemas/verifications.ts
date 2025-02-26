import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { created_at, updated_at, uuid } from './shared'

export const verifications = sqliteTable('verifications', {
  id: uuid,
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
  createdAt: created_at,
  updatedAt: updated_at,
}, table => [
  index('verifications_identifier_idx').on(table.identifier),
])
