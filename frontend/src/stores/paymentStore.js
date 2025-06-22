import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    loading: false,
    error: null,
    currentSession: null,
  }),

  actions: {
    async createCheckoutSession(type, amount, customerInfo) {
      this.loading = true
      this.error = null

      try {
        // Success ve cancel URL'lerini oluştur
        const currentPath = window.location.pathname + window.location.search
        const successUrl = `${window.location.origin}/payment/success?from=${encodeURIComponent(currentPath)}`
        const cancelUrl = `${window.location.origin}/payment/cancel?from=${encodeURIComponent(currentPath)}`

        const items = [{
          name: type === 'coffee' ? 'Kahve Falı' : 'Rüya Yorumu',
          description: type === 'coffee' ? 'Kahve Falı Yorumu' : 'Rüya Yorumu',
          type,
          amount
        }]

        const response = await axios.post('/api/payments/create-checkout-session', {
          items,
          customerInfo
        })

        if (response.data.url) {
          window.location.href = response.data.url
        } else {
          throw new Error("Ödeme URL'i alınamadı")
        }
      } catch (error) {
        console.error('Ödeme hatası:', error)
        this.error = error.response?.data?.message || 'Ödeme işlemi başlatılırken bir hata oluştu'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },

    async createPaymentSession({ productId, customerEmail, customerName, metadata }) {
      try {
        this.loading = true
        this.error = null

        // Görüntüleri metadata'dan ayır
        const { images, ...restMetadata } = metadata

        const response = await axios.post('/api/payments/create-session', {
          productId,
          customerEmail,
          customerName,
          images, // Görüntüleri ayrı bir alan olarak gönder
          metadata: {
            ...restMetadata,
            amount: metadata.type === 'coffee' ? 299.99 : 49.99
          }
        })

        this.currentSession = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Ödeme işlemi başlatılırken bir hata oluştu'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getCurrentSession: (state) => state.currentSession
  },
})
