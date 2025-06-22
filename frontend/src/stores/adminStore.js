import { defineStore } from 'pinia'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useAdminStore = defineStore('admin', {
  state: () => ({
    loading: false,
    error: null,
    stats: {
      totalUsers: 0,
      totalReadings: 0,
      totalDreams: 0,
      totalRevenue: 0
    },
    orders: [],
    products: [],
    settings: {
      general: {
        siteTitle: '',
        siteDescription: '',
        contactEmail: ''
      },
      pricing: {
        coffeeReadingPrice: 0,
        dreamInterpretationPrice: 0,
        commissionRate: 0
      },
      notifications: {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: false
      }
    }
  }),

  getters: {
    getStats: (state) => state.stats,
    getOrders: (state) => state.orders,
    getProducts: (state) => state.products,
    getSettings: (state) => state.settings,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    // Dashboard stats
    async fetchDashboardStats() {
      try {
        this.loading = true
        const response = await api.get('/api/admin/stats')
        this.stats = response.data
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        this.error = error.response?.data?.message || 'İstatistikler yüklenirken bir hata oluştu'
      } finally {
        this.loading = false
      }
    },

    // Orders
    async fetchOrders(filters = {}) {
      try {
        this.loading = true
        const response = await api.get('/api/admin/orders', { params: filters })
        this.orders = response.data
      } catch (error) {
        toast.error('Siparişler yüklenirken bir hata oluştu')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(orderId, status) {
      try {
        this.loading = true
        await api.put(`/api/admin/orders/${orderId}/status`, { status })
        toast.success('Sipariş durumu güncellendi')
        await this.fetchOrders()
      } catch (error) {
        toast.error('Sipariş durumu güncellenirken bir hata oluştu')
        throw error
      } finally {
        this.loading = false
      }
    },

    async saveInterpretation(orderId, interpretation) {
      try {
        this.loading = true
        await api.put(`/api/admin/orders/${orderId}/interpretation`, { interpretation })
        toast.success('Yorum kaydedildi ve mail gönderildi')
        await this.fetchOrders()
      } catch (error) {
        toast.error('Yorum kaydedilirken bir hata oluştu')
        throw error
      } finally {
        this.loading = false
      }
    },

    // Products
    async fetchProducts() {
      try {
        this.loading = true
        const response = await api.get('/api/admin/products')
        this.products = response.data
      } catch (error) {
        toast.error('Ürünler yüklenirken bir hata oluştu')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createProduct(productData) {
      try {
        this.loading = true
        const response = await api.post('/api/admin/products', productData)
        toast.success('Ürün başarıyla oluşturuldu')
        await this.fetchProducts()
        return response.data
      } catch (error) {
        toast.error('Ürün oluşturulurken bir hata oluştu')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProduct(productId, productData) {
      try {
        this.loading = true
        const response = await api.put(`/api/admin/products/${productId}`, productData)
        toast.success('Ürün başarıyla güncellendi')
        await this.fetchProducts()
        return response.data
      } catch (error) {
        toast.error('Ürün güncellenirken bir hata oluştu')
        throw error
      } finally {
        this.loading = false
      }
    },

    async toggleProductStatus(productId) {
      try {
        this.loading = true
        const response = await api.put(`/api/admin/products/${productId}/toggle`)
        toast.success('Ürün durumu güncellendi')
        await this.fetchProducts()
        return response.data
      } catch (error) {
        toast.error('Ürün durumu güncellenirken bir hata oluştu')
        throw error
      } finally {
        this.loading = false
      }
    },

    // Settings
    async fetchSettings() {
      try {
        this.loading = true
        const response = await api.get('/api/admin/settings')
        this.settings = response.data
      } catch (error) {
        toast.error('Ayarlar yüklenirken bir hata oluştu')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateGeneralSettings(settings) {
      try {
        this.loading = true
        await api.put('/api/admin/settings/general', settings)
        this.settings.general = settings
        toast.success('Genel ayarlar güncellendi')
      } catch (error) {
        toast.error('Ayarlar güncellenirken bir hata oluştu')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updatePricingSettings(settings) {
      try {
        this.loading = true
        await api.put('/api/admin/settings/pricing', settings)
        this.settings.pricing = settings
        toast.success('Fiyatlandırma ayarları güncellendi')
      } catch (error) {
        toast.error('Fiyatlandırma ayarları güncellenirken bir hata oluştu')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateNotificationSettings(settings) {
      try {
        this.loading = true
        await api.put('/api/admin/settings/notifications', settings)
        this.settings.notifications = settings
        toast.success('Bildirim ayarları güncellendi')
      } catch (error) {
        toast.error('Bildirim ayarları güncellenirken bir hata oluştu')
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchRecentOrders() {
      try {
        this.loading = true
        const response = await api.get('/api/admin/orders/recent')
        this.orders = response.data
      } catch (error) {
        console.error('Error fetching recent orders:', error)
        this.error = error.response?.data?.message || 'Siparişler yüklenirken bir hata oluştu'
      } finally {
        this.loading = false
      }
    }
  }
}) 
