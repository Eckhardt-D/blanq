import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'

export { and, asc, desc, eq, not, or, sql } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}
