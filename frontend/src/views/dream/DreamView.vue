<template lang="pug">
.dream-page
  .container(class="max-w-2xl mx-auto px-4 py-12")
    div(class="text-center mb-8")
      h1(class="text-3xl font-semibold text-white mb-2") Rüya Yorumu
      p(class="text-gray-300") Rüyanızı anlatın, uzmanlarımız yorumlasın

    .fortune__form-wrapper
      form.fortune__form(@submit.prevent="handleSubmit")
        .fortune__form-group
          label.fortune__label(for="name")
            UserIcon
            | Ad Soyad
          input.fortune__input#name(
            type="text"
            v-model="formData.name"
            placeholder="Adınız ve soyadınız"
            required
          )
        
        .fortune__form-group
          label.fortune__label(for="email")
            EnvelopeIcon
            | E-posta
          input.fortune__input#email(
            type="email"
            v-model="formData.email"
            placeholder="E-posta adresiniz"
            required
          )
        
        .fortune__form-group
          label.fortune__label(for="phone")
            PhoneIcon
            | Telefon
          input.fortune__input#phone(
            type="tel"
            v-model="formData.phone"
            placeholder="Telefon numaranız"
          )
        
        .fortune__form-group
          label.fortune__label(for="dream")
            DocumentTextIcon
            | Rüyanız
          textarea.fortune__textarea#dream(
            v-model="formData.dreamDescription"
            placeholder="Lütfen rüyanızı detaylı bir şekilde anlatın"
            rows="5"
            required
          )

        .fortune__form-group
          label.fortune__label(for="dreamDate")
            CalendarIcon
            | Rüya Tarihi
          input.fortune__input#dreamDate(
            type="date"
            v-model="formData.dreamDate"
            required
          )
        
        button.fortune__submit(
          type="submit"
          :disabled="loading"
        )
          span {{ loading ? 'Yönlendiriliyor...' : 'Sonucu Öğrenmek için Tıkla' }}
          ArrowRightIcon(v-if="!loading")
      
      .fortune__success(v-if="submitSuccess")
        p Rüya yorumu talebiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.
      
      .fortune__error(v-if="error")
        p {{ error }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePaymentStore } from '@/stores/paymentStore'
import { useProductStore } from '@/stores/productStore'
import { interpretationService } from '@/services/interpretationService'
import emailjs from '@emailjs/browser'
import {
  ArrowRightIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/solid'

const paymentStore = usePaymentStore()
const productStore = useProductStore()
const dreamProduct = productStore.getProduct('dream')

const formData = ref({
  dreamDate: '',
  dreamDescription: '',
  name: '',
  email: '',
  phone: ''
})

const loading = ref(false)
const submitSuccess = ref(false)
const error = ref(null)

const sendInterpretationEmail = async (interpretation) => {
  try {
    await emailjs.send(
      'service_c6xlk78',
      'template_ih1yeh1',
      {
        to_email: formData.value.email,
        from_email: 'info@falperiniz.com',
        name: formData.value.name,
        subject: 'Rüya Yorumunuz Hazır',
        message: `
          Merhaba ${formData.value.name},

          Rüya yorumunuz hazır! İşte detaylar:

          ${interpretation}

          Saygılarımızla,
          Fal Periniz Ekibi
        `,
        date: new Date().toLocaleString('tr-TR'),
        frameCompany: 'Fal Periniz'
      },
      'IVvH3Es3M6P9lWPI7'
    )
  } catch (error) {
    console.error('E-posta gönderme hatası:', error)
    throw new Error('E-posta gönderilirken bir hata oluştu')
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null

    // Ödeme işlemini başlat
    const { url } = await paymentStore.createPaymentSession({
      productId: dreamProduct.id,
      customerEmail: formData.value.email,
      customerName: formData.value.name,
      metadata: {
        type: 'dream',
        amount: dreamProduct.price,
        dreamDate: formData.value.dreamDate,
        dreamDescription: formData.value.dreamDescription
      }
    })

    // Ödeme sayfasına yönlendir
    window.location.href = url
  } catch (err) {
    console.error('Form gönderme hatası:', err)
    error.value = err.message || 'Bir hata oluştu'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.dream-page {
  padding-top: 5%;
  padding-bottom: 5%;
  background: linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 100%);
}

.fortune {
  &__form-wrapper {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__form-group {
    margin-bottom: 1.5rem;
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-weight: 500;
    font-size: 0.9375rem;
    margin-bottom: 0.5rem;

    svg {
      flex-shrink: 0;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &__input,
  &__textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    color: white;
    font-size: 0.9375rem;
    transition: all 0.2s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    &:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 120px;
  }

  &__submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    padding: 1rem;
    background: #6b46c1;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;

    svg {
      flex-shrink: 0;
      width: 1.5rem;
      height: 1.5rem;
    }

    &:hover:not(:disabled) {
      background: #553c9a;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  &__success,
  &__error {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
  }

  &__success {
    background: rgba(72, 187, 120, 0.1);
    color: #48bb78;
  }

  &__error {
    background: rgba(245, 101, 101, 0.1);
    color: #f56565;
  }
}

// Tarih seçici için özel stil
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.5;
}
</style>
