<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Rüya Yorumu #{{ interpretation.id }}</h1>
      <div class="flex space-x-2">
        <button v-if="interpretation.status === 'Bekliyor'" @click="startInterpretation"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Rüya Yorumlamaya Başla
        </button>
        <button @click="goBack" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
          Geri Dön
        </button>
      </div>
    </div>

    <!-- Müşteri Bilgileri -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">Müşteri Bilgileri</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-600">Ad Soyad</p>
          <p class="font-medium">{{ interpretation.customerName }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">E-posta</p>
          <p class="font-medium">{{ interpretation.customerEmail }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Telefon</p>
          <p class="font-medium">{{ interpretation.customerPhone }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Doğum Tarihi</p>
          <p class="font-medium">{{ interpretation.customerBirthDate }}</p>
        </div>
      </div>
    </div>

    <!-- Rüya Detayları -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">Rüya Detayları</h2>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-sm text-gray-600">Durum</p>
          <span :class="getStatusClass(interpretation.status)">
            {{ interpretation.status }}
          </span>
        </div>
        <div>
          <p class="text-sm text-gray-600">Tarih</p>
          <p class="font-medium">{{ interpretation.date }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Ücret</p>
          <p class="font-medium">{{ interpretation.price }}₺</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Rüya Görülme Tarihi</p>
          <p class="font-medium">{{ interpretation.dreamDate }}</p>
        </div>
      </div>

      <!-- Rüya Anlatımı -->
      <div class="mt-4">
        <h3 class="text-md font-semibold mb-2">Rüya Anlatımı</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-700 whitespace-pre-line">{{ interpretation.dreamDescription }}</p>
        </div>
      </div>

      <!-- Müşteri Notu -->
      <div v-if="interpretation.customerNote" class="mt-4">
        <h3 class="text-md font-semibold mb-2">Müşteri Notu</h3>
        <p class="text-gray-700 bg-gray-50 p-4 rounded-lg">{{ interpretation.customerNote }}</p>
      </div>

      <!-- Rüya Yorumu -->
      <div v-if="interpretation.interpretation" class="mt-4">
        <h3 class="text-md font-semibold mb-2">Rüya Yorumu</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-700 whitespace-pre-line">{{ interpretation.interpretation }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const route = useRoute();
const toast = useToast();

// Mock data - API'den gelecek
const interpretation = ref({
  id: route.params.id,
  customerName: 'Mehmet Yılmaz',
  customerEmail: 'mehmet@example.com',
  customerPhone: '0555 555 5555',
  customerBirthDate: '1985-05-15',
  status: 'Bekliyor',
  date: '2024-02-20',
  price: 40,
  dreamDate: '2024-02-19',
  dreamDescription: 'Rüyamda kendimi yüksek bir binanın tepesinde buldum. Etrafımda beyaz güvercinler uçuşuyordu. Gökyüzü çok parlaktı ve kendimi çok huzurlu hissediyordum.',
  customerNote: 'Son zamanlarda iş hayatımda bazı değişiklikler oldu, bunların rüyama yansımış olabileceğini düşünüyorum.',
  interpretation: null
});

const getStatusClass = (status) => {
  return {
    'Bekliyor': 'px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800',
    'Devam Ediyor': 'px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800',
    'Tamamlandı': 'px-2 py-1 text-sm rounded-full bg-green-100 text-green-800'
  }[status];
};

const startInterpretation = () => {
  router.push({
    name: 'dream-interpreter-interpretation-start',
    params: { id: interpretation.value.id }
  });
};

const goBack = () => {
  router.push({ name: 'dream-interpreter-interpretations' });
};

onMounted(async () => {
  try {
    // API'den rüya yorumu detaylarını getir
    // const response = await api.getInterpretation(route.params.id);
    // interpretation.value = response.data;
  } catch (error) {
    toast.error('Rüya yorumu detayları yüklenirken bir hata oluştu');
  }
});
</script>
