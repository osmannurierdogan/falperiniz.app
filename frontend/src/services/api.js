import axios from '@/plugins/axios'

export const api = {
  // Payment endpoints
  createCheckoutSession(data) {
    return axios.post('/api/payments/create-checkout-session', data)
  },

  // Fortune endpoints
  getFortunes() {
    return axios.get('/api/fortunes')
  },
  getFortune(id) {
    return axios.get(`/api/fortunes/${id}`)
  },
  createFortune(data) {
    return axios.post('/api/fortunes', data)
  },
  updateFortune(id, data) {
    return axios.put(`/api/fortunes/${id}`, data)
  },

  // Dream endpoints
  getDreams() {
    return axios.get('/api/dreams')
  },
  getDream(id) {
    return axios.get(`/api/dreams/${id}`)
  },
  createDream(data) {
    return axios.post('/api/dreams', data)
  },
  updateDream(id, data) {
    return axios.put(`/api/dreams/${id}`, data)
  },

  // User endpoints
  updateProfile(data) {
    return axios.put('/api/users/profile', data)
  },
  changePassword(data) {
    return axios.put('/api/users/password', data)
  },
}

export default api
