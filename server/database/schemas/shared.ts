import { integer, text } from 'drizzle-orm/sqlite-core'
import { uuidv7 } from 'uuidv7'

export const uuid = text('id').primaryKey().$defaultFn(uuidv7)

export const created_at = integer('created_at', { mode: 'timestamp_ms' })
  .$defaultFn(() => new Date())

export const updated_at = integer('updated_at', { mode: 'timestamp_ms' })
  .$defaultFn(() => new Date())
  .$onUpdateFn(() => new Date())

export const deleted_at = integer('deleted_at', { mode: 'timestamp_ms' })
