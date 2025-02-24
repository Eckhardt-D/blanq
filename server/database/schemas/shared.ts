import { integer } from 'drizzle-orm/sqlite-core'

export const created_at = integer('created_at', { mode: 'timestamp_ms' })
  .$defaultFn(() => new Date())

export const updated_at = integer('updated_at', { mode: 'timestamp_ms' })
  .$defaultFn(() => new Date())
  .$onUpdateFn(() => new Date())

export const deleted_at = integer('deleted_at', { mode: 'timestamp_ms' })
