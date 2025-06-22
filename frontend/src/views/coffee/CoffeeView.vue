<template lang="pug">
.coffee-page
  .container(class="max-w-2xl mx-auto px-4 py-12")
    div(class="text-center mb-8")
      h1(class="text-3xl font-semibold text-white mb-2") Kahve Falı
      p(class="text-gray-300") Fincanınızı okuyalım, geleceğinize ışık tutalım

    .fortune__form-wrapper
      form.fortune__form(@submit.prevent="handleSubmit")
        .fortune__form-group
          label.fortune__label(for="name") Ad Soyad
          input.fortune__input#name(
            type="text"
            v-model="form.name"
            placeholder="Adınız ve soyadınız"
            required
          )
        
        .fortune__form-group
          label.fortune__label(for="email") E-posta
          input.fortune__input#email(
            type="email"
            v-model="form.email"
            placeholder="E-posta adresiniz"
            required
          )
        
        .fortune__form-group
          label.fortune__label(for="phone") Telefon
          input.fortune__input#phone(
            type="tel"
            v-model="form.phone"
            placeholder="Telefon numaranız"
          )

        .fortune__form-group
          label.fortune__label(for="photos") Fincan Fotoğrafları
          input.fortune__input#photos(
            type="file"
            accept="image/*"
            multiple
            @change="handlePhotoUpload"
            required
          )
          .fortune__photo-preview(v-if="photoPreview.length")
            .fortune__photo-item(v-for="(photo, index) in photoPreview" :key="index")
              img(:src="photo" alt="Fincan fotoğrafı")
              button.fortune__photo-remove(@click.prevent="removePhoto(index)")
                i.fas.fa-times
        
        .fortune__form-group
          label.fortune__label(for="notes") Notlar
          textarea.fortune__textarea#notes(
            v-model="form.notes"
            placeholder="Eklemek istediğiniz notlar (opsiyonel)"
            rows="3"
          )
        
        button.fortune__submit(
          type="submit"
          :disabled="isSubmitting"
        )
          span {{ isSubmitting ? 'Yönlendiriliyor...' : 'Sonucu Öğrenmek için Tıkla' }}
          i.fas.fa-arrow-right(v-if="!isSubmitting")
      
      .fortune__success(v-if="submitSuccess")
        p Fal talebiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.
      
      .fortune__error(v-if="submitError")
        p {{ submitError }}
</template>

<script setup>
import { ref } from 'vue'
import { usePaymentStore } from '@/stores/paymentStore'
import { useProductStore } from '@/stores/productStore'
import emailjs from '@emailjs/browser'

const paymentStore = usePaymentStore()
const productStore = useProductStore()
const coffeeProduct = productStore.getProduct('coffee')

const form = ref({
  name: '',
  email: '',
  phone: '',
  notes: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref(null)
const photoPreview = ref([])
const photos = ref([])

const handlePhotoUpload = (event) => {
  const files = Array.from(event.target.files)
  photos.value = files

  photoPreview.value = []
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removePhoto = (index) => {
  photoPreview.value.splice(index, 1)
  photos.value.splice(index, 1)
}

const sendFormEmail = async (formData) => {
  try {
    await emailjs.send(
      'service_c6xlk78',
      'template_p8fsufc',
      {
        to_email: 'osmerd04@gmail.com',
        from_email: 'info@falperiniz.com',
        subscriber_email: formData.email,
        name: formData.name,
        subject: 'Yeni Kahve Falı Talebi',
        message: `
          Ad Soyad: ${formData.name}
          E-posta: ${formData.email}
          Telefon: ${formData.phone}
          Notlar: ${formData.notes}
          Fotoğraf Sayısı: ${formData.photoCount}
          Tarih: ${new Date().toLocaleString('tr-TR')}
          Ödeme Tutarı: ${coffeeProduct.price} TL
        `,
        date: new Date().toLocaleString('tr-TR'),
        frameCompany: 'Fal Periniz'
      },
      'IVvH3Es3M6P9lWPI7'
    )
  } catch (error) {
    console.error('E-posta gönderme hatası:', error)
    throw error
  }
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    submitError.value = null

    // Form verilerini hazırla
    const formData = {
      ...form.value,
      photoCount: photos.value.length
    }

    // Müşteri bilgilerini hazırla
    const customerInfo = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone
    }

    // E-posta gönder
    // await sendFormEmail(formData)

    // Ödeme işlemini başlat
    await paymentStore.createCheckoutSession('coffee', coffeeProduct.price, customerInfo)

    submitSuccess.value = true
  } catch (error) {
    console.error('Form gönderme hatası:', error)
    submitError.value = error.message || 'Form gönderme hatası oluştu'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped>
.coffee-page {
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
    display: block;
    margin-bottom: 0.5rem;
    color: white;
    font-weight: 500;
    font-size: 0.9375rem;
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

  &__photo-preview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  &__photo-item {
    position: relative;
    aspect-ratio: 1;
    border-radius: 0.5rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__photo-remove {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
  }

  &__submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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

    &:hover:not(:disabled) {
      background: #553c9a;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    i {
      font-size: 0.875rem;
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

input[type="file"] {
  &::-webkit-file-upload-button {
    visibility: hidden;
    width: 0;
  }

  &::before {
    content: 'Fotoğraf Seç';
    display: inline-block;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    color: white;
    font-weight: 500;
    font-size: 0.9375rem;
    transition: all 0.2s ease;
  }

  &:hover::before {
    border-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
