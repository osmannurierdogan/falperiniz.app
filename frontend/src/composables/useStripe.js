import { ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export function useStripe() {
  const isLoading = ref(false)
  const error = ref(null)

  const createPaymentIntent = async (amount) => {
    try {
      const response = await fetch('http://localhost:3000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      if (!response.ok) {
        throw new Error('Ödeme başlatılırken bir hata oluştu')
      }

      const { clientSecret } = await response.json()
      return clientSecret
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Bir hata oluştu'
      throw err
    }
  }

  const handlePayment = async (amount) => {
    isLoading.value = true
    error.value = null

    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe yüklenemedi')
      }

      const clientSecret = await createPaymentIntent(amount)

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // Kart bilgileri Stripe Elements ile alınacak
          },
          billing_details: {
            // Fatura bilgileri buraya eklenecek
          },
        },
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ödeme işlemi başarısız'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    handlePayment,
  }
}
