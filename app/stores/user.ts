import type { User } from '~~/server/database/schemas/users'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  return {
    user,
  }
})
