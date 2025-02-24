import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { created_at, deleted_at, updated_at } from './shared'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: created_at,
  updatedAt: updated_at,
  deletedAt: deleted_at,
})
