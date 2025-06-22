<template lang="pug">
.settings-page
  .container
    h1.text-2xl.font-bold.mb-6.text-white Sistem Ayarları

    .grid(class="grid-cols-1 lg:grid-cols-2 gap-8")
      //- Genel Ayarlar
      .settings-card
        h2.text-xl.font-semibold.mb-4.text-white Genel Ayarlar
        
        form(@submit.prevent="saveGeneralSettings").space-y-4
          .form-group
            label.block.text-sm.font-medium.text-gray-300.mb-1 Site Başlığı
            input(
              v-model="generalSettings.siteTitle"
              type="text"
              class="form-input"
              required
            )

          .form-group
            label.block.text-sm.font-medium.text-gray-300.mb-1 Site Açıklaması
            textarea(
              v-model="generalSettings.siteDescription"
              rows="3"
              class="form-textarea"
              required
            )

          .form-group
            label.block.text-sm.font-medium.text-gray-300.mb-1 İletişim E-posta
            input(
              v-model="generalSettings.contactEmail"
              type="email"
              class="form-input"
              required
            )

          button.w-full.btn.btn-primary(type="submit") Genel Ayarları Kaydet

      //- Fiyatlandırma Ayarları
      .settings-card
        h2.text-xl.font-semibold.mb-4.text-white Fiyatlandırma Ayarları
        
        form(@submit.prevent="savePricingSettings").space-y-4
          .form-group
            label.block.text-sm.font-medium.text-gray-300.mb-1 Kahve Falı Ücreti (₺)
            input(
              v-model="pricingSettings.coffeeReadingPrice"
              type="number"
              min="0"
              step="0.01"
              class="form-input"
              required
            )

          .form-group
            label.block.text-sm.font-medium.text-gray-300.mb-1 Rüya Yorumu Ücreti (₺)
            input(
              v-model="pricingSettings.dreamInterpretationPrice"
              type="number"
              min="0"
              step="0.01"
              class="form-input"
              required
            )

          .form-group
            label.block.text-sm.font-medium.text-gray-300.mb-1 Komisyon Oranı (%)
            input(
              v-model="pricingSettings.commissionRate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              class="form-input"
              required
            )

          button.w-full.btn.btn-primary(type="submit") Fiyatlandırma Ayarlarını Kaydet

      //- Bildirim Ayarları
      .settings-card
        h2.text-xl.font-semibold.mb-4.text-white Bildirim Ayarları
        
        form(@submit.prevent="saveNotificationSettings").space-y-4
          .form-group
            .flex.items-center
              input(
                v-model="notificationSettings.emailNotifications"
                type="checkbox"
                class="form-checkbox"
              )
              label.ml-2.text-sm.text-gray-300 E-posta Bildirimleri

          .form-group
            .flex.items-center
              input(
                v-model="notificationSettings.smsNotifications"
                type="checkbox"
                class="form-checkbox"
              )
              label.ml-2.text-sm.text-gray-300 SMS Bildirimleri

          .form-group
            .flex.items-center
              input(
                v-model="notificationSettings.pushNotifications"
                type="checkbox"
                class="form-checkbox"
              )
              label.ml-2.text-sm.text-gray-300 Push Bildirimleri

          button.w-full.btn.btn-primary(type="submit") Bildirim Ayarlarını Kaydet

    //- Template Preview Modal
    .modal(
      v-if="previewData"
      @click.self="closePreview"
      class="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
    )
      .modal-content.bg-gray-900.rounded-lg.p-6.max-w-2xl.w-full.mx-4
        h3.text-xl.font-semibold.text-white.mb-4 E-posta Önizleme
        .preview-header.mb-4
          .info-item.mb-2
            span.text-gray-400 Konu:
            span.text-white.ml-2 {{ previewData.subject }}
          .info-item
            span.text-gray-400 Gönderen:
            span.text-white.ml-2 {{ settings.general.siteName }} &lt;{{ settings.general.contactEmail }}&gt;
        
        .preview-body.bg-white\/5.rounded.p-4.mb-4(
          v-html="previewData.content"
        )
        
        .flex.justify-end
          button.btn.btn-outline(@click="closePreview") Kapat
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useAdminStore } from '@/stores/adminStore'

const toast = useToast()
const adminStore = useAdminStore()

// Form verileri
const generalSettings = ref({
  siteTitle: '',
  siteDescription: '',
  contactEmail: ''
})

const pricingSettings = ref({
  coffeeReadingPrice: 0,
  dreamInterpretationPrice: 0,
  commissionRate: 0
})

const notificationSettings = ref({
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: false
})

// Preview modal state
const previewData = ref(null)

// Ayarları yükle
onMounted(async () => {
  try {
    await adminStore.fetchSettings()
    generalSettings.value = { ...adminStore.settings.general }
    pricingSettings.value = { ...adminStore.settings.pricing }
    notificationSettings.value = { ...adminStore.settings.notifications }
  } catch (error) {
    console.error('Ayarlar yüklenirken hata:', error)
    toast.error('Ayarlar yüklenirken bir hata oluştu')
  }
})

// Genel ayarları kaydetme
const saveGeneralSettings = async () => {
  try {
    await adminStore.updateGeneralSettings(generalSettings.value)
    toast.success('Genel ayarlar kaydedildi')
  } catch (error) {
    console.error('Genel ayarlar kaydedilirken hata:', error)
    toast.error('Genel ayarlar kaydedilirken bir hata oluştu')
  }
}

const savePricingSettings = async () => {
  try {
    await adminStore.updatePricingSettings(pricingSettings.value)
    toast.success('Fiyatlandırma ayarları kaydedildi')
  } catch (error) {
    console.error('Fiyatlandırma ayarları kaydedilirken hata:', error)
    toast.error('Fiyatlandırma ayarları kaydedilirken bir hata oluştu')
  }
}

const saveNotificationSettings = async () => {
  try {
    await adminStore.updateNotificationSettings(notificationSettings.value)
    toast.success('Bildirim ayarları kaydedildi')
  } catch (error) {
    console.error('Bildirim ayarları kaydedilirken hata:', error)
    toast.error('Bildirim ayarları kaydedilirken bir hata oluştu')
  }
}

const closePreview = () => {
  previewData.value = null
}
</script>

<style lang="scss" scoped>
.settings-page {
  .settings-card {
    @apply bg-white/5 p-6 rounded-lg;
  }

  .form-input,
  .form-textarea {
    @apply w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white;
    @apply focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500;

    &::placeholder {
      @apply text-gray-400;
    }
  }

  .form-textarea {
    @apply resize-none;
  }

  .form-checkbox {
    @apply h-4 w-4 text-primary-500 focus:ring-primary-500 border-white/20 rounded bg-white/10;
  }

  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;

    &.btn-primary {
      @apply bg-primary-500 text-white;
      @apply hover:bg-primary-600;
      @apply disabled:opacity-50 disabled:cursor-not-allowed;
    }

    &.btn-outline {
      @apply border border-white/20 text-white;
      @apply hover:bg-white/10;
    }
  }

  // Modal Animation
  .modal {
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
}
</style>
