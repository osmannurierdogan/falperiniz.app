<template lang="pug">
.orders-page
  .container(class="max-w-7xl mx-auto px-4 py-8")
    .header(class="mb-8")
      h1(class="text-3xl font-semibold text-white mb-2") Sipariş Yönetimi
      p(class="text-gray-300") Kahve Falı ve Rüya Yorumu Siparişleri

    .filters(class="mb-6 bg-white/5 p-4 rounded-lg")
      .grid(class="grid-cols-1 md:grid-cols-4 gap-4")
        .filter-group
          label.text-sm.text-gray-300(for="status") Durum
          select#status.form-select(v-model="filters.status")
            option(value="all") Tümü
            option(value="pending") Bekleyen
            option(value="inProgress") İşleme Alınan
            option(value="completed") Tamamlanan
        
        .filter-group
          label.text-sm.text-gray-300(for="type") Tür
          select#type.form-select(v-model="filters.type")
            option(value="all") Tümü
            option(value="coffee") Kahve Falı
            option(value="dream") Rüya Yorumu
        
        .filter-group
          label.text-sm.text-gray-300(for="date") Tarih
          input#date.form-input(
            type="date"
            v-model="filters.date"
          )
        
        .filter-group(class="flex items-end")
          button.btn.btn-primary(
            @click="resetFilters"
            class="w-full"
          ) Filtreleri Sıfırla

    .orders-grid(class="grid gap-6")
      .order-card(
        v-for="order in filteredOrders"
        :key="order.id"
        class="bg-white/5 rounded-lg overflow-hidden"
      )
        .order-header(
          class="bg-white/5 p-4 flex items-center justify-between"
          :class="getStatusClass(order.status)"
        )
          .order-info
            span.order-id.text-sm.text-gray-400 #{{ order.id }}
            span.order-date.text-sm.text-gray-400.ml-4 {{ formatDate(order.createdAt) }}
          .order-status
            span.status-badge(
              :class="getStatusBadgeClass(order.status)"
            ) {{ getStatusText(order.status) }}

        .order-content(class="p-4")
          .grid(class="grid-cols-1 md:grid-cols-2 gap-4")
            .customer-info
              h3.text-lg.font-medium.text-white.mb-2 Müşteri Bilgileri
              .info-item
                span.label.text-gray-400 Ad Soyad:
                span.value.text-white.ml-2 {{ order.customer.name }}
              .info-item
                span.label.text-gray-400 E-posta:
                span.value.text-white.ml-2 {{ order.customer.email }}
              .info-item
                span.label.text-gray-400 Telefon:
                span.value.text-white.ml-2 {{ order.customer.phone }}
            
            .order-details
              h3.text-lg.font-medium.text-white.mb-2 Sipariş Detayları
              .info-item
                span.label.text-gray-400 Tür:
                span.value.text-white.ml-2 {{ getOrderTypeText(order.type) }}
              .info-item
                span.label.text-gray-400 Tutar:
                span.value.text-white.ml-2 {{ formatPrice(order.amount) }} TL
              .info-item(v-if="order.type === 'coffee'")
                span.label.text-gray-400 Fotoğraf Sayısı:
                span.value.text-white.ml-2 {{ order.photoCount }}
              .info-item(v-if="order.type === 'dream'")
                span.label.text-gray-400 Rüya Tarihi:
                span.value.text-white.ml-2 {{ formatDate(order.dreamDate) }}

          .order-content-section(class="mt-4")
            h3.text-lg.font-medium.text-white.mb-2 {{ order.type === 'coffee' ? 'Kahve Falı' : 'Rüya' }} İçeriği
            .content-box(
              class="bg-white/5 rounded p-3 text-gray-300"
              v-if="order.type === 'dream'"
            ) {{ order.dreamContent }}
            .photo-grid(
              v-else
              class="grid grid-cols-2 md:grid-cols-4 gap-2"
            )
              .photo-item(
                v-for="(photo, index) in order.photos"
                :key="index"
                class="relative aspect-square rounded overflow-hidden"
              )
                img(
                  :src="photo"
                  :alt="`Fincan fotoğrafı ${index + 1}`"
                  class="w-full h-full object-cover"
                )
                button.photo-zoom(
                  @click="openPhotoModal(photo)"
                  class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                )
                  i.fas.fa-search-plus.text-white.text-xl

          .interpretation-section(class="mt-6")
            h3.text-lg.font-medium.text-white.mb-2 Yorum
            template(v-if="order.status === 'completed'")
              .interpretation-box(
                class="bg-white/5 rounded p-4 text-gray-300"
              ) {{ order.interpretation }}
            template(v-else)
              textarea.form-textarea(
                v-model="order.draftInterpretation"
                rows="6"
                placeholder="Yorumunuzu buraya yazın..."
                class="w-full"
              )
              .actions(class="mt-4 flex gap-4")
                button.btn.btn-primary(
                  @click="saveInterpretation(order)"
                  :disabled="!order.draftInterpretation"
                ) Yorumu Kaydet ve Mail Gönder
                button.btn.btn-outline(
                  @click="updateStatus(order, 'inProgress')"
                  v-if="order.status === 'pending'"
                ) İşleme Al
                button.btn.btn-outline(
                  @click="updateStatus(order, 'pending')"
                  v-if="order.status === 'inProgress'"
                ) Beklemeye Al

    //- Fotoğraf Modal
    .photo-modal(
      v-if="selectedPhoto"
      @click="closePhotoModal"
      class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    )
      .modal-content(class="max-w-4xl max-h-[90vh]")
        img(
          :src="selectedPhoto"
          alt="Büyük fotoğraf"
          class="max-w-full max-h-full"
        )
        button.modal-close(
          @click="closePhotoModal"
          class="absolute top-4 right-4 text-white text-2xl"
        )
          i.fas.fa-times
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Filtreler
const filters = ref({
  status: 'all',
  type: 'all',
  date: ''
})

// Örnek veriler (Backend entegrasyonunda değiştirilecek)
const orders = ref([
  {
    id: '1001',
    type: 'coffee',
    status: 'pending',
    createdAt: '2024-03-20T10:30:00',
    customer: {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '5551234567'
    },
    amount: 299.99,
    photoCount: 3,
    photos: [
      '/sample/coffee1.jpg',
      '/sample/coffee2.jpg',
      '/sample/coffee3.jpg'
    ],
    draftInterpretation: ''
  },
  {
    id: '1002',
    type: 'dream',
    status: 'inProgress',
    createdAt: '2024-03-20T11:15:00',
    customer: {
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      phone: '5559876543'
    },
    amount: 49.99,
    dreamDate: '2024-03-19',
    dreamContent: 'Rüyamda beyaz bir at üzerinde uçsuz bucaksız bir ovada koşuyordum...',
    draftInterpretation: ''
  }
])

// Filtrelenmiş siparişler
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    if (filters.value.status !== 'all' && order.status !== filters.value.status) return false
    if (filters.value.type !== 'all' && order.type !== filters.value.type) return false
    if (filters.value.date) {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0]
      if (orderDate !== filters.value.date) return false
    }
    return true
  })
})

// Fotoğraf modal
const selectedPhoto = ref(null)

const openPhotoModal = (photo) => {
  selectedPhoto.value = photo
}

const closePhotoModal = () => {
  selectedPhoto.value = null
}

// Yardımcı fonksiyonlar
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatPrice = (price) => {
  return Number(price).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const getOrderTypeText = (type) => {
  return type === 'coffee' ? 'Kahve Falı' : 'Rüya Yorumu'
}

const getStatusText = (status) => {
  const statusMap = {
    pending: 'Bekliyor',
    inProgress: 'İşleme Alındı',
    completed: 'Tamamlandı'
  }
  return statusMap[status]
}

const getStatusClass = (status) => {
  const statusMap = {
    pending: 'border-l-4 border-yellow-500',
    inProgress: 'border-l-4 border-blue-500',
    completed: 'border-l-4 border-green-500'
  }
  return statusMap[status]
}

const getStatusBadgeClass = (status) => {
  const statusMap = {
    pending: 'bg-yellow-500/20 text-yellow-300',
    inProgress: 'bg-blue-500/20 text-blue-300',
    completed: 'bg-green-500/20 text-green-300'
  }
  return `px-3 py-1 rounded-full text-sm ${statusMap[status]}`
}

const resetFilters = () => {
  filters.value = {
    status: 'all',
    type: 'all',
    date: ''
  }
}

// Backend entegrasyonu için fonksiyonlar
const saveInterpretation = async (order) => {
  try {
    // Backend'e yorum gönderme ve mail atma işlemi burada yapılacak
    // Örnek:
    // await adminStore.saveInterpretation(order.id, order.draftInterpretation)
    toast.success('Yorum kaydedildi ve mail gönderildi')
    order.interpretation = order.draftInterpretation
    order.status = 'completed'
    order.draftInterpretation = ''
  } catch (error) {
    toast.error('Bir hata oluştu')
    console.error('Yorum kaydetme hatası:', error)
  }
}

const updateStatus = async (order, newStatus) => {
  try {
    // Backend'e durum güncelleme işlemi burada yapılacak
    // Örnek:
    // await adminStore.updateOrderStatus(order.id, newStatus)
    order.status = newStatus
    toast.success('Durum güncellendi')
  } catch (error) {
    toast.error('Bir hata oluştu')
    console.error('Durum güncelleme hatası:', error)
  }
}
</script>

<style lang="scss" scoped>
.orders-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
}

.form-select,
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

.order-card {
  @apply transition-transform duration-200;

  &:hover {
    transform: translateY(-2px);
  }
}

.info-item {
  @apply mb-2 last:mb-0;
}

.status-badge {
  @apply inline-block;
}

.photo-grid {
  .photo-item {
    img {
      @apply transition-transform duration-200;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }
}

// Animasyonlar
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.photo-modal {
  animation: fadeIn 0.2s ease-out;
}
</style>
