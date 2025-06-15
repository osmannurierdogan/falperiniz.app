import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// İstek interceptor'ı
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('İstek yapılıyor:', config.url) // Debug için
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    console.error('İstek hatası:', error)
    return Promise.reject(error)
  },
)

// Yanıt interceptor'ı
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Başarılı yanıt:', response.config.url) // Debug için
    return response
  },
  (error) => {
    if (error.response) {
      // Sunucudan gelen hata yanıtı
      console.error('API Hatası:', {
        status: error.response.status,
        url: error.config.url,
        data: error.response.data,
      })
    } else if (error.request) {
      // Sunucuya ulaşılamadı
      console.error('Sunucuya ulaşılamadı:', error.config.url)
    } else {
      // İstek oluşturulurken hata oluştu
      console.error('İstek hatası:', error.message)
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
