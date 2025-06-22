import axios from 'axios'
import { useToast } from 'vue-toastification'
import router from '@/router'

const toast = useToast()

// API URL'ini ayarla
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:9999'

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('Response error:', error)

    // Yetki hatası
    if (error.response?.status === 403) {
      toast.error('Bu işlem için yetkiniz bulunmuyor.')
    }
    // Sunucu hatası
    else if (error.response?.status >= 500) {
      toast.error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.')
    }
    // Diğer hatalar
    else {
      const message = error.response?.data?.message || 'Bir hata oluştu'
      toast.error(message)
    }

    return Promise.reject(error)
  }
)

export default axios
