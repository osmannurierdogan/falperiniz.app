import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { useToast } from 'vue-toastification'

const toast = useToast()

// API URL'ini ayarla
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
})

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
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        localStorage.removeItem('token')
        delete api.defaults.headers.common['Authorization']
      }
    },

    setUser(user) {
      this.user = user
      console.log('User state updated:', user)
    },

    async register(credentials) {
      try {
        this.loading = true
        this.error = null
        const response = await api.post('/api/auth/register', credentials)
        this.setToken(response.data.token)
        this.setUser(response.data.user)
        toast.success('Kayıt başarılı!')
        return true
      } catch (error) {
        const message = error.response?.data?.message || 'Kayıt işlemi başarısız oldu'
        toast.error(message)
        this.error = message
        return false
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      try {
        this.loading = true
        this.error = null
        console.log('Login attempt for:', email)
        const response = await api.post('/api/auth/login', { email, password })
        console.log('Login response:', response.data)
        
        if (response.data.token && response.data.user) {
          this.setToken(response.data.token)
          this.setUser(response.data.user)
          toast.success('Giriş başarılı!')
          return true
        } else {
          throw new Error('Invalid response format')
        }
      } catch (error) {
        console.error('Login error:', error)
        const message = error.response?.data?.message || 'Giriş işlemi başarısız oldu'
        toast.error(message)
        this.error = message
        return false
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.setToken(null)
      this.setUser(null)
      toast.info('Çıkış yapıldı')
      router.push('/login')
    },

    // Token kontrolü
    async checkAuth() {
      return !!this.token
    },
  },
})
