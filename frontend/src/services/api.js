import axios from '@/plugins/axios'

export const api = {
  createCheckoutSession(data) {
    return axios.post('/create-checkout-session', data)
  },
}

export default api
