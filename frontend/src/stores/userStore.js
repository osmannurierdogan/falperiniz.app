import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
  }),

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    setUser(userData) {
      this.user = userData
      this.isAuthenticated = true
    },

    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('token')
    },

    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          this.token = token
          // API'den kullanıcı bilgilerini çek
          const response = await fetch('/api/user/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (response.ok) {
            const userData = await response.json()
            this.setUser(userData)
          } else {
            this.logout()
          }
        } catch (error) {
          console.error('Auth check error:', error)
          this.logout()
        }
      }
    },
  },
})
