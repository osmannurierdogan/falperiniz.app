import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import { useProductStore } from './productStore'
import { useAuthStore } from './authStore'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    loading: false,
    error: null,
    currentSession: null,
    successUrl: null,
    cancelUrl: null,
  }),

  actions: {
    async createCheckoutSession(type, amount, customerInfo) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        
        // Success ve cancel URL'lerini güncelle
        const currentPath = window.location.pathname + window.location.search
        this.successUrl = `${window.location.origin}/payment/success?from=${encodeURIComponent(currentPath)}`
        this.cancelUrl = `${window.location.origin}/payment/cancel?from=${encodeURIComponent(currentPath)}`

        const items = [{
          name: type === 'coffee' ? 'Kahve Falı' : 'Rüya Yorumu',
          description: type === 'coffee' ? 'Kahve Falı Yorumu' : 'Rüya Yorumu',
          type,
          amount
        }]

        console.log('Ödeme isteği gönderiliyor:', {
          items,
          userId: authStore.user?._id,
          customerInfo
        })

        const response = await axios.post('/api/payments/create-checkout-session', {
          items,
          userId: authStore.user?._id,
          customerInfo
        })

        console.log('Ödeme yanıtı:', response.data)

        this.currentSession = response.data

        if (response.data.url) {
          window.location.href = response.data.url
        } else {
          throw new Error("Ödeme URL'i alınamadı")
        }
      } catch (error) {
        console.error('Ödeme hatası:', error)
        if (error.response?.data?.message) {
          this.error = error.response.data.message
        } else {
          this.error = 'Ödeme işlemi başlatılırken bir hata oluştu'
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },

    clearSession() {
      this.currentSession = null
    },
  },

  getters: {
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getCurrentSession: (state) => state.currentSession,
  },
})
