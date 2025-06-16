import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

// API URL'ini ayarla
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    // Token yenileme denemesi yapılmamışsa ve 401 hatası alındıysa
    if (error.response?.status === 401 && !originalRequest._retry && authStore.token) {
      originalRequest._retry = true

      try {
        // Token'ı yenile
        await authStore.refreshToken()

        // Yeni token ile isteği tekrarla
        originalRequest.headers.Authorization = `Bearer ${authStore.token}`
        return axios(originalRequest)
      } catch (refreshError) {
        // Token yenileme başarısız olursa çıkış yap
        await authStore.logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default axios
