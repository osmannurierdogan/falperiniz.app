<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Rüya Yorumcusu Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- İstatistikler -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">Bekleyen Yorumlar</h3>
        <p class="text-3xl font-bold text-purple-600">{{ pendingInterpretations }}</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">Tamamlanan Yorumlar</h3>
        <p class="text-3xl font-bold text-green-600">{{ completedInterpretations }}</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">Ortalama Puan</h3>
        <p class="text-3xl font-bold text-yellow-600">{{ averageRating }}/5</p>
      </div>
    </div>

    <!-- Son Yorumlar -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Son Yorumlar</h2>
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
            <tr v-for="interpretation in recentInterpretations" :key="interpretation.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ interpretation.customerName }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ interpretation.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(interpretation.status)">
                  {{ interpretation.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-purple-600 hover:text-purple-900" @click="viewInterpretation(interpretation.id)">
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
const pendingInterpretations = ref(3);
const completedInterpretations = ref(120);
const averageRating = ref(4.7);

const recentInterpretations = ref([
  {
    id: 1,
    customerName: 'Ali Yıldız',
    date: '2024-02-20',
    status: 'Bekliyor'
  },
  {
    id: 2,
    customerName: 'Zeynep Kaya',
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

const viewInterpretation = (id) => {
  router.push({ name: 'dream-interpreter-interpretations', params: { id } });
};
</script>
