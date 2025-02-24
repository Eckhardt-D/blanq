import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { created_at, updated_at, uuid } from './shared'

import { users } from './users'

export const accounts = sqliteTable('accounts', {
  id: uuid,
  userId: text('user_id').notNull().references(() => users.id),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp_ms' }),
  refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp_ms' }),
  scope: text('scope'),
  idToken: text('id_token'),
  password: text('password'),
  createdAt: created_at,
  updatedAt: updated_at,
}, table => [
  index('accounts_user_id_idx').on(table.userId),
  index('accounts_account_id_idx').on(table.accountId),
])
