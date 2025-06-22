<template lang="pug">
.products-page
  .container.py-6
    .flex.items-center.justify-between.mb-6
      h1.text-2xl.font-semibold.text-white Ürün Yönetimi
      BaseButton(
        @click="openProductModal()"
        variant="primary"
      )
        i.fas.fa-plus.mr-2
        span Yeni Ürün

    .grid(class="grid-cols-1 md:grid-cols-2 gap-6")
      .product-card(
        v-for="product in adminStore.products"
        :key="product.id"
        class="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
      )
        .flex.items-center.justify-between.mb-4
          h3.text-xl.font-medium.text-white {{ product.name }}
          .badge(
            :class="product.active ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'"
            class="px-3 py-1 rounded-full text-sm"
          ) {{ product.active ? 'Aktif' : 'Pasif' }}

        .product-info.space-y-4
          .info-item
            label.text-sm.text-gray-400 Açıklama
            p.text-white {{ product.description }}

          .info-item
            label.text-sm.text-gray-400 Fiyat
            p.text-white {{ formatPrice(product.price) }}

          .info-item
            label.text-sm.text-gray-400 Ortalama Tamamlanma Süresi
            p.text-white {{ product.averageCompletionTime }}

          .info-item
            label.text-sm.text-gray-400 Özellikler
            .features.mt-2.space-y-2
              .feature.flex.items-center.text-white(
                v-for="feature in product.features"
                :key="feature"
              )
                i.fas.fa-check.text-green-500.mr-2
                span {{ feature }}

        .flex.justify-end.mt-6.space-x-3
          BaseButton(
            variant="outline"
            @click="toggleProductStatus(product)"
            :class="product.active ? 'text-red-300 hover:bg-red-500/10' : 'text-green-300 hover:bg-green-500/10'"
          ) {{ product.active ? 'Pasife Al' : 'Aktife Al' }}
          
          BaseButton(
            variant="primary"
            @click="openProductModal(product)"
          ) Düzenle

  BaseModal(
    v-model="modal.isOpen"
    :title="editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'"
    :loading="loading"
    :loading-text="editingProduct ? 'Güncelleniyor...' : 'Ekleniyor...'"
    :confirm-text="editingProduct ? 'Güncelle' : 'Ekle'"
    @confirm="handleSubmit(saveProduct)"
  )
    form(@submit.prevent="handleSubmit(saveProduct)")
      BaseInput(
        id="name"
        v-model="form.name"
        label="Ürün Adı"
        required
        :error="errors.name"
      )

      .form-group.mb-4
        label.text-sm.text-gray-300(for="description") Açıklama
        textarea#description(
          v-model="form.description"
          rows="3"
          required
          class="form-textarea w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
          :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.description }"
        )
        .text-red-500.text-sm.mt-1(v-if="errors.description") {{ errors.description }}

      BaseInput(
        id="price"
        v-model="form.price"
        type="number"
        label="Fiyat (TL)"
        required
        step="0.01"
        min="0"
        :error="errors.price"
      )

      BaseInput(
        id="completion-time"
        v-model="form.averageCompletionTime"
        label="Ortalama Tamamlanma Süresi"
        required
        :error="errors.averageCompletionTime"
      )

      .form-group.mb-6
        label.text-sm.text-gray-300 Özellikler
        .features-list.space-y-2.mt-2
          .feature.flex.items-center(
            v-for="(feature, index) in form.features"
            :key="index"
          )
            input.form-input(
              v-model="form.features[index]"
              placeholder="Özellik ekle"
              class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            )
            button.text-red-500.ml-2(
              type="button"
              @click="removeFeature(index)"
            )
              i.fas.fa-times
          
          BaseButton(
            type="button"
            variant="outline"
            @click="addFeature"
            class="mt-2"
          )
            i.fas.fa-plus.mr-2
            span Özellik Ekle
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useAdminStore } from '@/stores/adminStore'
import { useForm } from '@/composables/useForm'
import { useModal } from '@/composables/useModal'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const toast = useToast()
const adminStore = useAdminStore()

const editingProduct = ref(null)

const { form, errors, loading, handleSubmit, resetForm } = useForm(
  {
    name: '',
    description: '',
    price: 0,
    averageCompletionTime: '',
    features: []
  },
  {
    resetOnSuccess: true,
    successMessage: (form) => editingProduct.value
      ? 'Ürün başarıyla güncellendi'
      : 'Yeni ürün başarıyla eklendi'
  }
)

const modal = useModal({
  onClose: () => {
    editingProduct.value = null
    resetForm()
  }
})

onMounted(async () => {
  try {
    await adminStore.fetchProducts()
  } catch (error) {
    console.error('Ürünler yüklenirken hata:', error)
  }
})

// Fiyat formatlama
const formatPrice = (price) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(price)
}

// Modal işlemleri
const openProductModal = (product = null) => {
  if (product) {
    editingProduct.value = product
    Object.assign(form, product)
  }
  modal.open()
}

// Özellik işlemleri
const addFeature = () => {
  form.features.push('')
}

const removeFeature = (index) => {
  form.features.splice(index, 1)
}

// Ürün kaydetme
const saveProduct = async () => {
  // Boş özellikleri temizle
  form.features = form.features.filter(f => f.trim())

  try {
    if (editingProduct.value) {
      await adminStore.updateProduct(editingProduct.value.id, form)
    } else {
      await adminStore.createProduct(form)
    }
    modal.close()
  } catch (error) {
    console.error('Ürün kaydedilirken hata:', error)
  }
}

// Ürün durumu değiştirme
const toggleProductStatus = async (product) => {
  try {
    await adminStore.toggleProductStatus(product.id)
  } catch (error) {
    console.error('Ürün durumu güncellenirken hata:', error)
  }
}
</script>

<style lang="scss" scoped>
.products-page {
  .form-textarea {
    @apply w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white;
    @apply focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500;
    @apply resize-none;

    &::placeholder {
      @apply text-gray-400;
    }

    &.border-red-500 {
      @apply focus:border-red-500 focus:ring-red-500;
    }
  }

  .badge {
    @apply px-3 py-1 rounded-full text-sm font-medium;
  }

  .product-card {
    @apply transition-all duration-200;

    &:hover {
      transform: translateY(-2px);
    }
  }
}
</style>
