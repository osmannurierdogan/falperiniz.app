<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Rüya Yorumlama #{{ interpretation.id }}</h1>
      <button @click="goBack" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
        Geri Dön
      </button>
    </div>

    <!-- Ana İçerik -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sol Panel - Rüya Detayları ve Yorum -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Rüya Anlatımı -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Rüya Anlatımı</h2>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-700 whitespace-pre-line">{{ interpretation.dreamDescription }}</p>
          </div>
        </div>

        <!-- Müşteri Notu -->
        <div v-if="interpretation.customerNote" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Müşteri Notu</h2>
          <p class="text-gray-700 bg-gray-50 p-4 rounded-lg">{{ interpretation.customerNote }}</p>
        </div>

        <!-- Rüya Yorumu -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Rüya Yorumu</h2>
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
              <p class="font-medium">{{ interpretation.customerName }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Doğum Tarihi</p>
              <p class="font-medium">{{ interpretation.customerBirthDate }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Burç</p>
              <p class="font-medium">{{ interpretation.zodiacSign }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Rüya Görülme Tarihi</p>
              <p class="font-medium">{{ interpretation.dreamDate }}</p>
            </div>
          </div>
        </div>

        <!-- Rüya Sembolleri -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Rüya Sembolleri</h2>
          <div class="space-y-2">
            <div class="flex items-center">
              <input type="text" v-model="newSymbol" placeholder="Yeni sembol ekle"
                class="flex-1 border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                @keyup.enter="addSymbol" />
              <button @click="addSymbol" class="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700">
                Ekle
              </button>
            </div>
            <div class="mt-3">
              <div v-for="(symbol, index) in symbols" :key="index" class="flex items-center justify-between py-2">
                <span class="text-gray-700">{{ symbol }}</span>
                <button @click="removeSymbol(index)" class="text-red-600 hover:text-red-800">
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Kontroller -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="space-y-4">
            <button @click="saveAsDraft" class="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Taslak Olarak Kaydet
            </button>
            <button @click="completeInterpretation"
              class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Yorumu Tamamla
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
const interpretation = ref({
  id: route.params.id,
  customerName: 'Mehmet Yılmaz',
  customerBirthDate: '1985-05-15',
  zodiacSign: 'Boğa',
  dreamDate: '2024-02-19',
  dreamDescription: 'Rüyamda kendimi yüksek bir binanın tepesinde buldum. Etrafımda beyaz güvercinler uçuşuyordu. Gökyüzü çok parlaktı ve kendimi çok huzurlu hissediyordum.',
  customerNote: 'Son zamanlarda iş hayatımda bazı değişiklikler oldu, bunların rüyama yansımış olabileceğini düşünüyorum.'
});

const sections = ref([
  {
    title: 'Genel Yorum',
    content: '',
    placeholder: 'Rüyanın genel yorumunu yazın...'
  },
  {
    title: 'Sembolik Anlamlar',
    content: '',
    placeholder: 'Rüyadaki sembollerin anlamlarını açıklayın...'
  },
  {
    title: 'Hayatınızdaki Yansımalar',
    content: '',
    placeholder: 'Rüyanın gerçek hayattaki yansımalarını yazın...'
  },
  {
    title: 'Öneriler',
    content: '',
    placeholder: 'Rüya ile ilgili önerilerinizi yazın...'
  }
]);

const quickNotes = ref([
  'Bu rüya, içsel huzurunuzu yansıtıyor.',
  'Yakın zamanda olumlu gelişmeler yaşayacaksınız.',
  'Rüyanızdaki semboller, manevi bir yükselişe işaret ediyor.',
  'Bu dönemde önemli kararlar alabilirsiniz.',
  'Çevrenizdeki değişimlere açık olun.'
]);

const symbols = ref([]);
const newSymbol = ref('');

const addSymbol = () => {
  if (newSymbol.value.trim()) {
    symbols.value.push(newSymbol.value.trim());
    newSymbol.value = '';
  }
};

const removeSymbol = (index) => {
  symbols.value.splice(index, 1);
};

const goBack = () => {
  router.push({ name: 'dream-interpreter-interpretations' });
};

const insertQuickNote = (note) => {
  // Aktif textarea'ya notu ekle
  console.log('Inserting quick note:', note);
};

const saveAsDraft = async () => {
  try {
    // API'ye taslak kaydet
    toast.success('Rüya yorumu taslak olarak kaydedildi');
  } catch (error) {
    toast.error('Kayıt sırasında bir hata oluştu');
  }
};

const completeInterpretation = async () => {
  try {
    // Tüm alanların dolu olduğunu kontrol et
    if (sections.value.some(section => !section.content.trim())) {
      toast.warning('Lütfen tüm yorum alanlarını doldurun');
      return;
    }

    // API'ye tamamlanmış yorumu gönder
    toast.success('Rüya yorumu başarıyla tamamlandı');
    router.push({ name: 'dream-interpreter-interpretations' });
  } catch (error) {
    toast.error('Yorum tamamlanırken bir hata oluştu');
  }
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
