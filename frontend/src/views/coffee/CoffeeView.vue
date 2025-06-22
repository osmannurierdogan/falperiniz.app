<template lang="pug">
.coffee-page
  .container(class="max-w-2xl mx-auto px-4 py-12")
    div(class="text-center mb-8")
      h1(class="text-3xl font-semibold text-white mb-2") Kahve Falı
      p(class="text-gray-300") Fincanınızı okuyalım, geleceğinize ışık tutalım

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
          label.fortune__label(for="photos")
            PhotoIcon
            | Fincan Fotoğrafları
          input.fortune__input#photos(
            type="file"
            accept="image/*"
            multiple
            @change="handleImageUpload"
            required
          )
          .fortune__photo-preview(v-if="photoPreview.length")
            .fortune__photo-item(v-for="(photo, index) in photoPreview" :key="index")
              img(:src="photo" alt="Fincan fotoğrafı")
              button.fortune__photo-remove(@click.prevent="removePhoto(index)")
                XMarkIcon
        
        .fortune__form-group
          label.fortune__label(for="notes") Notlar
          textarea.fortune__textarea#notes(
            v-model="formData.notes"
            placeholder="Eklemek istediğiniz notlar (opsiyonel)"
            rows="3"
          )
        
        button.fortune__submit(
          type="submit"
          :disabled="loading"
        )
          span {{ loading ? 'Yönlendiriliyor...' : 'Sonucu Öğrenmek için Tıkla' }}
          ArrowRightIcon(v-if="!loading")
      
      .fortune__success(v-if="submitSuccess")
        p Fal talebiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.
      
      .fortune__error(v-if="error")
        p {{ error }}
</template>

<script setup>
import { ref } from 'vue'
import { usePaymentStore } from '@/stores/paymentStore'
import { useProductStore } from '@/stores/productStore'
import { interpretationService } from '@/services/interpretationService'
import emailjs from '@emailjs/browser'
import {
  ArrowRightIcon,
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  PhotoIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/solid'

const paymentStore = usePaymentStore()
const productStore = useProductStore()
const coffeeProduct = productStore.getProduct('coffee')

const formData = ref({
  images: [],
  name: '',
  email: '',
  phone: '',
  notes: ''
})

const loading = ref(false)
const submitSuccess = ref(false)
const error = ref(null)
const photoPreview = ref([])
const photos = ref([])

const handleImageUpload = (event) => {
  const files = event.target.files
  if (!files.length) return

  const maxFiles = 3
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/png']

  // Dosya sayısı kontrolü
  if (files.length > maxFiles) {
    error.value = `En fazla ${maxFiles} fotoğraf yükleyebilirsiniz`
    return
  }

  // Dosya tipi ve boyut kontrolü
  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      error.value = 'Sadece JPEG ve PNG formatında fotoğraflar yükleyebilirsiniz'
      return
    }
    if (file.size > maxSize) {
      error.value = 'Fotoğraflar en fazla 5MB boyutunda olabilir'
      return
    }
  }

  // Dosyaları base64'e çevir
  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.images.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removePhoto = (index) => {
  photoPreview.value.splice(index, 1)
  photos.value.splice(index, 1)
}

const sendInterpretationEmail = async (interpretation) => {
  try {
    await emailjs.send(
      'service_c6xlk78',
      'template_ih1yeh1',
      {
        to_email: formData.value.email,
        from_email: 'info@falperiniz.com',
        name: formData.value.name,
        subject: 'Kahve Falınız Hazır',
        message: `
          Merhaba ${formData.value.name},

          Kahve falınız hazır! İşte detaylar:

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

const sendWhatsAppMessage = async (interpretation) => {
  const phoneNumber = formData.value.phone.replace(/[^0-9]/g, '')
  const message = encodeURIComponent(`
Merhaba ${formData.value.name},

Kahve falınız hazır! İşte detaylar:

${interpretation}

Saygılarımızla,
Fal Periniz Ekibi
  `)

  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null

    // Ödeme işlemini başlat
    const { url } = await paymentStore.createPaymentSession({
      productId: coffeeProduct.id,
      customerEmail: formData.value.email,
      customerName: formData.value.name,
      metadata: {
        type: 'coffee',
        images: formData.value.images,
        phone: formData.value.phone
      }
    })

    // Kahve falı yorumunu al
    const interpretation = await interpretationService.interpretCoffee({
      images: formData.value.images
    })

    // E-posta gönder
    await sendInterpretationEmail(interpretation)

    // WhatsApp mesajı gönder
    if (formData.value.phone) {
      await sendWhatsAppMessage(interpretation)
    }

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
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-weight: 500;
    font-size: 0.9375rem;

    svg {
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
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
