<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Fal Detayı #{{ reading.id }}</h1>
      <div class="flex space-x-2">
        <button v-if="reading.status === 'Bekliyor'" @click="startReading"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Fal Bakmaya Başla
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
          <p class="font-medium">{{ reading.customerName }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">E-posta</p>
          <p class="font-medium">{{ reading.customerEmail }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Telefon</p>
          <p class="font-medium">{{ reading.customerPhone }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Doğum Tarihi</p>
          <p class="font-medium">{{ reading.customerBirthDate }}</p>
        </div>
      </div>
    </div>

    <!-- Fal Detayları -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">Fal Detayları</h2>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-sm text-gray-600">Fal Türü</p>
          <p class="font-medium">{{ reading.type }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Durum</p>
          <span :class="getStatusClass(reading.status)">
            {{ reading.status }}
          </span>
        </div>
        <div>
          <p class="text-sm text-gray-600">Tarih</p>
          <p class="font-medium">{{ reading.date }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Ücret</p>
          <p class="font-medium">{{ reading.price }}₺</p>
        </div>
      </div>

      <!-- Fal Fotoğrafları -->
      <div v-if="reading.photos?.length" class="mt-4">
        <h3 class="text-md font-semibold mb-2">Fal Fotoğrafları</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="(photo, index) in reading.photos" :key="index" class="relative">
            <img :src="photo.url" :alt="`Fal fotoğrafı ${index + 1}`"
              class="w-full h-48 object-cover rounded-lg cursor-pointer" @click="openPhotoModal(photo)" />
          </div>
        </div>
      </div>

      <!-- Müşteri Notu -->
      <div v-if="reading.customerNote" class="mt-4">
        <h3 class="text-md font-semibold mb-2">Müşteri Notu</h3>
        <p class="text-gray-700 bg-gray-50 p-4 rounded-lg">{{ reading.customerNote }}</p>
      </div>

      <!-- Fal Yorumu -->
      <div v-if="reading.interpretation" class="mt-4">
        <h3 class="text-md font-semibold mb-2">Fal Yorumu</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-700 whitespace-pre-line">{{ reading.interpretation }}</p>
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
const reading = ref({
  id: route.params.id,
  customerName: 'Ayşe Yılmaz',
  customerEmail: 'ayse@example.com',
  customerPhone: '0555 555 5555',
  customerBirthDate: '1990-01-01',
  type: 'Kahve Falı',
  status: 'Bekliyor',
  date: '2024-02-20',
  price: 50,
  photos: [
    { url: 'https://example.com/photo1.jpg' },
    { url: 'https://example.com/photo2.jpg' }
  ],
  customerNote: 'Özellikle aşk ve kariyer konularına odaklanılmasını rica ediyorum.',
  interpretation: null
});

const getStatusClass = (status) => {
  return {
    'Bekliyor': 'px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800',
    'Devam Ediyor': 'px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800',
    'Tamamlandı': 'px-2 py-1 text-sm rounded-full bg-green-100 text-green-800'
  }[status];
};

const startReading = () => {
  router.push({
    name: 'fortune-teller-reading-start',
    params: { id: reading.value.id }
  });
};

const goBack = () => {
  router.push({ name: 'fortune-teller-readings' });
};

const openPhotoModal = (photo) => {
  // Fotoğraf modalını aç
  console.log('Opening photo:', photo);
};

onMounted(async () => {
  try {
    // API'den fal detaylarını getir
    // const response = await api.getReading(route.params.id);
    // reading.value = response.data;
  } catch (error) {
    toast.error('Fal detayları yüklenirken bir hata oluştu');
  }
});
</script>
