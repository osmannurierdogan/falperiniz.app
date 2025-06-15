import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import { useProductStore } from './productStore'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    loading: false,
    error: null,
    currentSession: null,
    successUrl: null,
    cancelUrl: null,
  }),

  actions: {
    async createCheckoutSession(productId) {
      this.loading = true
      this.error = null

      try {
        // Success ve cancel URL'lerini güncelle
        const currentPath = window.location.pathname + window.location.search
        this.successUrl = `${window.location.origin}/payment/success?from=${encodeURIComponent(currentPath)}`
        this.cancelUrl = `${window.location.origin}/payment/cancel?from=${encodeURIComponent(currentPath)}`

        const productStore = useProductStore()
        const product = productStore.getProduct(productId)

        if (!product) {
          throw new Error('Ürün bulunamadı')
        }

        console.log('Ödeme isteği gönderiliyor:', {
          productId,
          amount: product.price,
        })

        const response = await axios.post('/create-checkout-session', {
          amount: product.price,
          currency: 'TRY',
          successUrl: this.successUrl,
          cancelUrl: this.cancelUrl,
          productName: product.name,
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
        if (error.response?.data?.error) {
          this.error = `Ödeme hatası: ${error.response.data.error}`
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
