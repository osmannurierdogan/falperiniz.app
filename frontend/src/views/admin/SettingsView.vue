<template lang="pug">
.settings-page
  .container
    //- Fiyatlandırma Ayarları
    .settings-section(class="mb-8")
      h2.text-2xl.font-semibold.text-white.mb-4 Fiyatlandırma
      .grid(class="grid-cols-1 md:grid-cols-2 gap-6")
        .price-card(class="bg-white/5 rounded-lg p-6")
          .flex.items-center.justify-between.mb-4
            h3.text-lg.font-medium.text-white Kahve Falı
            .badge(class="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300") Aktif
          .price-input(class="mb-4")
            label.text-sm.text-gray-300(for="coffee-price") Fiyat (TL)
            input#coffee-price.form-input(
              type="number"
              v-model="settings.prices.coffee"
              step="0.01"
              min="0"
            )
          button.btn.btn-primary(
            @click="updatePrice('coffee')"
            :disabled="!isPriceChanged('coffee')"
          ) Güncelle

        .price-card(class="bg-white/5 rounded-lg p-6")
          .flex.items-center.justify-between.mb-4
            h3.text-lg.font-medium.text-white Rüya Yorumu
            .badge(class="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300") Aktif
          .price-input(class="mb-4")
            label.text-sm.text-gray-300(for="dream-price") Fiyat (TL)
            input#dream-price.form-input(
              type="number"
              v-model="settings.prices.dream"
              step="0.01"
              min="0"
            )
          button.btn.btn-primary(
            @click="updatePrice('dream')"
            :disabled="!isPriceChanged('dream')"
          ) Güncelle

    //- E-posta Şablonları
    .settings-section(class="mb-8")
      h2.text-2xl.font-semibold.text-white.mb-4 E-posta Şablonları
      .grid(class="grid-cols-1 gap-6")
        .template-card(
          v-for="template in settings.emailTemplates"
          :key="template.id"
          class="bg-white/5 rounded-lg p-6"
        )
          .flex.items-center.justify-between.mb-4
            h3.text-lg.font-medium.text-white {{ template.name }}
            button.btn.btn-outline(
              @click="previewTemplate(template)"
            ) Önizle
          .template-input(class="mb-4")
            label.text-sm.text-gray-300(for="template-subject") Konu
            input.form-input(
              :id="`template-subject-${template.id}`"
              v-model="template.subject"
            )
          .template-input(class="mb-4")
            label.text-sm.text-gray-300(for="template-content") İçerik
            textarea.form-textarea(
              :id="`template-content-${template.id}`"
              v-model="template.content"
              rows="6"
            )
          .flex.justify-end
            button.btn.btn-primary(
              @click="saveTemplate(template)"
              :disabled="!isTemplateChanged(template)"
            ) Kaydet

    //- Bildirim Ayarları
    .settings-section(class="mb-8")
      h2.text-2xl.font-semibold.text-white.mb-4 Bildirim Ayarları
      .notification-card(class="bg-white/5 rounded-lg p-6")
        .grid(class="grid-cols-1 md:grid-cols-2 gap-6")
          .notification-setting
            .flex.items-center.justify-between.mb-2
              label.text-white(for="email-notifications") E-posta Bildirimleri
              .toggle-switch
                input#email-notifications(
                  type="checkbox"
                  v-model="settings.notifications.email"
                )
                span.slider
            p.text-sm.text-gray-400 Yeni siparişlerde e-posta bildirimi al
          
          .notification-setting
            .flex.items-center.justify-between.mb-2
              label.text-white(for="browser-notifications") Tarayıcı Bildirimleri
              .toggle-switch
                input#browser-notifications(
                  type="checkbox"
                  v-model="settings.notifications.browser"
                )
                span.slider
            p.text-sm.text-gray-400 Tarayıcı üzerinden anlık bildirim al

    //- Genel Ayarlar
    .settings-section
      h2.text-2xl.font-semibold.text-white.mb-4 Genel Ayarlar
      .general-card(class="bg-white/5 rounded-lg p-6")
        .grid(class="grid-cols-1 md:grid-cols-2 gap-6")
          .setting-input
            label.text-sm.text-gray-300(for="site-name") Site Adı
            input#site-name.form-input(
              v-model="settings.general.siteName"
            )
          
          .setting-input
            label.text-sm.text-gray-300(for="contact-email") İletişim E-postası
            input#contact-email.form-input(
              type="email"
              v-model="settings.general.contactEmail"
            )
          
          .setting-input
            label.text-sm.text-gray-300(for="whatsapp") WhatsApp Numarası
            input#whatsapp.form-input(
              v-model="settings.general.whatsapp"
            )
          
          .setting-input
            label.text-sm.text-gray-300(for="maintenance-mode") Bakım Modu
            .toggle-switch
              input#maintenance-mode(
                type="checkbox"
                v-model="settings.general.maintenanceMode"
              )
              span.slider
        
        .mt-6
          button.btn.btn-primary(
            @click="saveGeneralSettings"
            :disabled="!isGeneralSettingsChanged"
          ) Ayarları Kaydet

  //- Template Preview Modal
  .modal(
    v-if="previewData"
    @click.self="closePreview"
    class="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
  )
    .modal-content(
      class="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4"
    )
      h3.text-xl.font-semibold.text-white.mb-4 E-posta Önizleme
      .preview-header(class="mb-4")
        .info-item(class="mb-2")
          span.text-gray-400 Konu:
          span.text-white.ml-2 {{ previewData.subject }}
        .info-item
          span.text-gray-400 Gönderen:
          span.text-white.ml-2 {{ settings.general.siteName }} &lt;{{ settings.general.contactEmail }}&gt;
      
      .preview-body(
        class="bg-white/5 rounded p-4 mb-4"
        v-html="previewData.content"
      )
      
      .flex.justify-end
        button.btn.btn-outline(
          @click="closePreview"
        ) Kapat
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Örnek veriler (Backend entegrasyonunda değiştirilecek)
const originalSettings = {
  prices: {
    coffee: 299.99,
    dream: 49.99
  },
  emailTemplates: [
    {
      id: 'coffee-complete',
      name: 'Kahve Falı Tamamlandı',
      subject: 'Kahve Falınız Hazır! 🔮',
      content: `
        <p>Sayın {name},</p>
        <p>Kahve falınız yorumlandı ve hazır!</p>
        <div class="interpretation">
          {interpretation}
        </div>
        <p>Teşekkür ederiz,<br>{siteName}</p>
      `
    },
    {
      id: 'dream-complete',
      name: 'Rüya Yorumu Tamamlandı',
      subject: 'Rüya Yorumunuz Hazır! 🌙',
      content: `
        <p>Sayın {name},</p>
        <p>{dreamDate} tarihli rüyanızın yorumu hazır:</p>
        <div class="interpretation">
          {interpretation}
        </div>
        <p>Teşekkür ederiz,<br>{siteName}</p>
      `
    }
  ],
  notifications: {
    email: true,
    browser: true
  },
  general: {
    siteName: 'Fal Periniz',
    contactEmail: 'info@falperiniz.com',
    whatsapp: '905555555555',
    maintenanceMode: false
  }
}

const settings = ref(JSON.parse(JSON.stringify(originalSettings)))
const previewData = ref(null)

// Fiyat değişikliği kontrolü
const isPriceChanged = (type) => {
  return settings.value.prices[type] !== originalSettings.prices[type]
}

// Template değişikliği kontrolü
const isTemplateChanged = (template) => {
  const original = originalSettings.emailTemplates.find(t => t.id === template.id)
  return template.subject !== original.subject || template.content !== original.content
}

// Genel ayarlar değişikliği kontrolü
const isGeneralSettingsChanged = computed(() => {
  return JSON.stringify(settings.value.general) !== JSON.stringify(originalSettings.general)
})

// Fiyat güncelleme
const updatePrice = async (type) => {
  try {
    // Backend'e fiyat güncelleme isteği
    // await adminStore.updatePrice(type, settings.value.prices[type])
    originalSettings.prices[type] = settings.value.prices[type]
    toast.success('Fiyat güncellendi')
  } catch (error) {
    toast.error('Fiyat güncellenirken bir hata oluştu')
    console.error('Fiyat güncelleme hatası:', error)
  }
}

// Template kaydetme
const saveTemplate = async (template) => {
  try {
    // Backend'e template güncelleme isteği
    // await adminStore.updateEmailTemplate(template)
    const index = originalSettings.emailTemplates.findIndex(t => t.id === template.id)
    originalSettings.emailTemplates[index] = { ...template }
    toast.success('Şablon kaydedildi')
  } catch (error) {
    toast.error('Şablon kaydedilirken bir hata oluştu')
    console.error('Şablon kaydetme hatası:', error)
  }
}

// Template önizleme
const previewTemplate = (template) => {
  const previewContent = template.content
    .replace('{name}', 'Ahmet Yılmaz')
    .replace('{dreamDate}', '20 Mart 2024')
    .replace('{interpretation}', 'Örnek yorum içeriği burada yer alacak...')
    .replace('{siteName}', settings.value.general.siteName)

  previewData.value = {
    subject: template.subject,
    content: previewContent
  }
}

const closePreview = () => {
  previewData.value = null
}

// Genel ayarları kaydetme
const saveGeneralSettings = async () => {
  try {
    // Backend'e genel ayarları güncelleme isteği
    // await adminStore.updateGeneralSettings(settings.value.general)
    originalSettings.general = { ...settings.value.general }
    toast.success('Ayarlar kaydedildi')
  } catch (error) {
    toast.error('Ayarlar kaydedilirken bir hata oluştu')
    console.error('Ayarlar kaydetme hatası:', error)
  }
}
</script>

<style lang="scss" scoped>
.settings-page {

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

  // Toggle Switch
  .toggle-switch {
    @apply relative inline-block w-12 h-6;

    input {
      @apply opacity-0 w-0 h-0;

      &:checked+.slider {
        @apply bg-primary-500;
      }

      &:checked+.slider:before {
        transform: translateX(24px);
      }
    }

    .slider {
      @apply absolute cursor-pointer inset-0 bg-gray-600 rounded-full transition-all duration-200;

      &:before {
        content: '';
        @apply absolute h-4 w-4 left-1 bottom-1 bg-white rounded-full transition-all duration-200;
      }
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
