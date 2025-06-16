import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
    getUser: (state) => state.user,
    getError: (state) => state.error,
  },

  actions: {
    setToken(token) {
      this.token = token
      if (token) {
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      }
    },

    async register(credentials) {
      try {
        this.loading = true
        this.error = null
        const response = await axios.post('/api/auth/register', credentials)
        this.setToken(response.data.token)
        this.user = response.data.user
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Kayıt işlemi başarısız oldu'
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(credentials) {
      try {
        this.loading = true
        this.error = null
        const response = await axios.post('/api/auth/login', credentials)
        this.setToken(response.data.token)
        this.user = response.data.user
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Giriş işlemi başarısız oldu'
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await axios.post('/api/auth/logout')
      } catch (error) {
        console.error('Çıkış hatası:', error)
      } finally {
        this.setToken(null)
        this.user = null
        router.push('/login')
      }
    },

    async fetchUser() {
      try {
        this.loading = true
        this.error = null
        const response = await axios.get('/api/auth/user')
        this.user = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Kullanıcı bilgileri alınamadı'
        if (error.response?.status === 401) {
          this.setToken(null)
          this.user = null
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProfile(data) {
      try {
        this.loading = true
        this.error = null
        const response = await axios.put('/api/auth/profile', data)
        this.user = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Profil güncellenemedi'
        throw error
      } finally {
        this.loading = false
      }
    },

    async changePassword(data) {
      try {
        this.loading = true
        this.error = null
        await axios.put('/api/auth/password', data)
      } catch (error) {
        this.error = error.response?.data?.message || 'Şifre değiştirilemedi'
        throw error
      } finally {
        this.loading = false
      }
    },

    async forgotPassword(email) {
      try {
        this.loading = true
        this.error = null
        await axios.post('/api/auth/forgot-password', { email })
      } catch (error) {
        this.error = error.response?.data?.message || 'Şifre sıfırlama işlemi başarısız oldu'
        throw error
      } finally {
        this.loading = false
      }
    },

    async resetPassword(data) {
      try {
        this.loading = true
        this.error = null
        await axios.post('/api/auth/reset-password', data)
      } catch (error) {
        this.error = error.response?.data?.message || 'Şifre sıfırlama işlemi başarısız oldu'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Token yenileme
    async refreshToken() {
      try {
        const response = await axios.post('/api/auth/refresh')
        this.setToken(response.data.token)
        return response.data.token
      } catch (error) {
        this.setToken(null)
        this.user = null
        throw error
      }
    },

    // Token kontrolü
    async checkAuth() {
      if (!this.token) return false

      try {
        await this.fetchUser()
        return true
      } catch (error) {
        return false
      }
    },
  },
})
