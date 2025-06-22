<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Fal Okumaları</h1>

    <!-- Filtreler -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Durum</label>
          <select v-model="filters.status"
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Tümü</option>
            <option value="Bekliyor">Bekliyor</option>
            <option value="Tamamlandı">Tamamlandı</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tarih Aralığı</label>
          <input type="date" v-model="filters.date"
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <div class="flex items-end">
          <button @click="applyFilters"
            class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Filtrele
          </button>
        </div>
      </div>
    </div>

    <!-- Fal Listesi -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fal Türü</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="reading in readings" :key="reading.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ reading.customerName }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ reading.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(reading.status)">
                {{ reading.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ reading.type }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button class="text-indigo-600 hover:text-indigo-900 mr-3" @click="viewReading(reading.id)">
                Görüntüle
              </button>
              <button v-if="reading.status === 'Bekliyor'" class="text-green-600 hover:text-green-900"
                @click="startReading(reading.id)">
                Fal Bak
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Sayfalama -->
    <div class="mt-4 flex justify-between items-center">
      <div class="text-sm text-gray-700">
        Toplam {{ totalReadings }} fal
      </div>
      <div class="flex space-x-2">
        <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
          class="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50">
          Önceki
        </button>
        <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)"
          class="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50">
          Sonraki
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Filtreler
const filters = reactive({
  status: '',
  date: ''
});

// Sayfalama
const currentPage = ref(1);
const totalPages = ref(5);
const totalReadings = ref(100);

// Mock data - API'den gelecek
const readings = ref([
  {
    id: 1,
    customerName: 'Ayşe Yılmaz',
    date: '2024-02-20',
    status: 'Bekliyor',
    type: 'Kahve Falı'
  },
  {
    id: 2,
    customerName: 'Mehmet Demir',
    date: '2024-02-19',
    status: 'Tamamlandı',
    type: 'Kahve Falı'
  }
]);

const getStatusClass = (status) => {
  return {
    'Bekliyor': 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800',
    'Tamamlandı': 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800'
  }[status];
};

const viewReading = (id) => {
  // Fal detay sayfasına yönlendir
  router.push({ name: 'fortune-teller-reading-detail', params: { id } });
};

const startReading = (id) => {
  // Fal bakma sayfasına yönlendir
  router.push({ name: 'fortune-teller-reading-start', params: { id } });
};

const applyFilters = () => {
  // API'ye filtre parametreleri ile istek at
  console.log('Filtreler uygulanıyor:', filters);
};

const changePage = (page) => {
  currentPage.value = page;
  // API'ye sayfa parametresi ile istek at
};
</script>
