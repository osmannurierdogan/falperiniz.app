<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Fal Bakma #{{ reading.id }}</h1>
      <button @click="goBack" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
        Geri Dön
      </button>
    </div>

    <!-- Fal Bilgileri -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sol Panel - Fotoğraflar -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Fal Fotoğrafları</h2>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(photo, index) in reading.photos" :key="index" class="relative">
              <img :src="photo.url" :alt="`Fal fotoğrafı ${index + 1}`"
                class="w-full h-64 object-cover rounded-lg cursor-pointer" @click="openPhotoModal(photo)" />
              <div class="absolute top-2 right-2">
                <button class="p-2 bg-white rounded-full shadow hover:bg-gray-100" @click="rotatePhoto(index)">
                  <span class="text-gray-600">⟳</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Müşteri Notu -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Müşteri Notu</h2>
          <p class="text-gray-700 bg-gray-50 p-4 rounded-lg">{{ reading.customerNote }}</p>
        </div>

        <!-- Fal Yorumu -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Fal Yorumu</h2>
          <div class="space-y-4">
            <div v-for="(section, index) in sections" :key="index">
              <label :for="`section-${index}`" class="block text-sm font-medium text-gray-700 mb-1">
                {{ section.title }}
              </label>
              <textarea :id="`section-${index}`" v-model="section.content" rows="4"
                class="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                :placeholder="section.placeholder"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Sağ Panel - Müşteri Bilgileri ve Kontroller -->
      <div class="space-y-6">
        <!-- Müşteri Bilgileri -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Müşteri Bilgileri</h2>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-600">Ad Soyad</p>
              <p class="font-medium">{{ reading.customerName }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Doğum Tarihi</p>
              <p class="font-medium">{{ reading.customerBirthDate }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Burç</p>
              <p class="font-medium">{{ reading.zodiacSign }}</p>
            </div>
          </div>
        </div>

        <!-- Kontroller -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="space-y-4">
            <button @click="saveAsDraft" class="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Taslak Olarak Kaydet
            </button>
            <button @click="completeReading"
              class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Falı Tamamla
            </button>
          </div>
        </div>

        <!-- Hızlı Notlar -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Hızlı Notlar</h2>
          <div class="space-y-2">
            <div v-for="(note, index) in quickNotes" :key="index">
              <button @click="insertQuickNote(note)"
                class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                {{ note }}
              </button>
            </div>
          </div>
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
  customerBirthDate: '1990-01-01',
  zodiacSign: 'Koç',
  photos: [
    { url: 'https://example.com/photo1.jpg', rotation: 0 },
    { url: 'https://example.com/photo2.jpg', rotation: 0 }
  ],
  customerNote: 'Özellikle aşk ve kariyer konularına odaklanılmasını rica ediyorum.'
});

const sections = ref([
  {
    title: 'Aşk ve İlişkiler',
    content: '',
    placeholder: 'Aşk hayatı ve ilişkiler hakkındaki yorumlarınızı yazın...'
  },
  {
    title: 'Kariyer ve İş Hayatı',
    content: '',
    placeholder: 'Kariyer ve iş hayatı hakkındaki yorumlarınızı yazın...'
  },
  {
    title: 'Sağlık',
    content: '',
    placeholder: 'Sağlık ile ilgili yorumlarınızı yazın...'
  },
  {
    title: 'Genel Görünüm',
    content: '',
    placeholder: 'Genel görünüm ve diğer konulardaki yorumlarınızı yazın...'
  }
]);

const quickNotes = ref([
  'Yakın zamanda güzel bir haber alacaksınız.',
  'Uzaktan gelen bir misafir sizi ziyaret edecek.',
  'İş hayatınızda olumlu gelişmeler yaşanacak.',
  'Maddi açıdan rahat bir dönem sizi bekliyor.',
  'Aşk hayatınızda yeni bir sayfa açılacak.'
]);

const goBack = () => {
  router.push({ name: 'fortune-teller-readings' });
};

const openPhotoModal = (photo) => {
  // Fotoğraf modalını aç
  console.log('Opening photo:', photo);
};

const rotatePhoto = (index) => {
  reading.value.photos[index].rotation = (reading.value.photos[index].rotation + 90) % 360;
};

const insertQuickNote = (note) => {
  // Aktif textarea'ya notu ekle
  console.log('Inserting quick note:', note);
};

const saveAsDraft = async () => {
  try {
    // API'ye taslak kaydet
    toast.success('Fal yorumu taslak olarak kaydedildi');
  } catch (error) {
    toast.error('Kayıt sırasında bir hata oluştu');
  }
};

const completeReading = async () => {
  try {
    // Tüm alanların dolu olduğunu kontrol et
    if (sections.value.some(section => !section.content.trim())) {
      toast.warning('Lütfen tüm yorum alanlarını doldurun');
      return;
    }

    // API'ye tamamlanmış falı gönder
    toast.success('Fal yorumu başarıyla tamamlandı');
    router.push({ name: 'fortune-teller-readings' });
  } catch (error) {
    toast.error('Fal tamamlanırken bir hata oluştu');
  }
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
