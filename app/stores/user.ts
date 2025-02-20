export const useUserStore = defineStore('user', () => {
  const user = ref<string | null>(null)

  function setUser(newUser: string | null) {
    user.value = newUser
  }

  return {
    user,
    setUser,
  }
})
