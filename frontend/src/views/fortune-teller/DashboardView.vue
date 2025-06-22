<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Falcı Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- İstatistikler -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">Bekleyen Fallar</h3>
        <p class="text-3xl font-bold text-indigo-600">{{ pendingReadings }}</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">Tamamlanan Fallar</h3>
        <p class="text-3xl font-bold text-green-600">{{ completedReadings }}</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">Ortalama Puan</h3>
        <p class="text-3xl font-bold text-yellow-600">{{ averageRating }}/5</p>
      </div>
    </div>

    <!-- Son Fallar -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Son Fallar</h2>
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="reading in recentReadings" :key="reading.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ reading.customerName }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ reading.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(reading.status)">
                  {{ reading.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-indigo-600 hover:text-indigo-900" @click="viewReading(reading.id)">
                  Görüntüle
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Mock data - API'den gelecek
const pendingReadings = ref(5);
const completedReadings = ref(150);
const averageRating = ref(4.8);

const recentReadings = ref([
  {
    id: 1,
    customerName: 'Ayşe Yılmaz',
    date: '2024-02-20',
    status: 'Bekliyor'
  },
  {
    id: 2,
    customerName: 'Mehmet Demir',
    date: '2024-02-19',
    status: 'Tamamlandı'
  }
]);

const getStatusClass = (status) => {
  return {
    'Bekliyor': 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800',
    'Tamamlandı': 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800'
  }[status];
};

const viewReading = (id) => {
  router.push({ name: 'fortune-teller-readings', params: { id } });
};
</script>
