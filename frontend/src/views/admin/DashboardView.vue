<template lang="pug">
.dashboard-page(class="min-h-screen bg-gray-900")
  h1.text-2xl.font-bold.mb-6.text-white Admin Dashboard

  //- İstatistikler
  .grid(class="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8")
    //- Toplam Kullanıcı
    .stat-card.bg-gradient-to-br.from-indigo-500.to-indigo-600
      .stat-icon
        i.fas.fa-users
      .stat-content
        h3 Toplam Kullanıcı
        p.stat-value {{ adminStore.loading ? 'Yükleniyor...' : (adminStore.stats.totalUsers || '0') }}

    //- Toplam Fal
    .stat-card.bg-gradient-to-br.from-purple-500.to-purple-600
      .stat-icon
        i.fas.fa-coffee
      .stat-content
        h3 Toplam Fal
        p.stat-value {{ adminStore.loading ? 'Yükleniyor...' : (adminStore.stats.totalReadings || '0') }}

    //- Toplam Rüya Yorumu
    .stat-card.bg-gradient-to-br.from-blue-500.to-blue-600
      .stat-icon
        i.fas.fa-moon
      .stat-content
        h3 Toplam Rüya Yorumu
        p.stat-value {{ adminStore.loading ? 'Yükleniyor...' : (adminStore.stats.totalDreams || '0') }}

    //- Toplam Kazanç
    .stat-card.bg-gradient-to-br.from-green-500.to-green-600
      .stat-icon
        i.fas.fa-chart-line
      .stat-content
        h3 Toplam Kazanç
        p.stat-value {{ adminStore.loading ? 'Yükleniyor...' : formatPrice(adminStore.stats.totalRevenue || 0) }}

  //- Grafikler
  .grid(class="grid-cols-1 lg:grid-cols-2 gap-6 mb-8")
    .chart-card
      h3.text-lg.font-semibold.mb-4.text-white Aylık Satışlar
      .h-64
        Line(:data="salesChartData" :options="lineChartOptions")

    .chart-card
      h3.text-lg.font-semibold.mb-4.text-white Hizmet Dağılımı
      .h-64
        Pie(:data="servicesChartData" :options="pieChartOptions")

  //- Son İşlemler
  .recent-transactions(class="bg-white/5 rounded-lg p-6")
    h2.text-xl.font-semibold.mb-4.text-white Son İşlemler
    .overflow-x-auto
      template(v-if="adminStore.loading")
        .text-center.py-8.text-gray-400 Yükleniyor...
      
      template(v-else-if="adminStore.orders?.length")
        table.min-w-full
          thead
            tr(class="bg-white/10")
              th.px-6.py-3.text-left.text-xs.font-medium.text-gray-300.uppercase.tracking-wider Kullanıcı
              th.px-6.py-3.text-left.text-xs.font-medium.text-gray-300.uppercase.tracking-wider İşlem
              th.px-6.py-3.text-left.text-xs.font-medium.text-gray-300.uppercase.tracking-wider Tarih
              th.px-6.py-3.text-left.text-xs.font-medium.text-gray-300.uppercase.tracking-wider Tutar
              th.px-6.py-3.text-left.text-xs.font-medium.text-gray-300.uppercase.tracking-wider Durum
          tbody(class="divide-y divide-white/10")
            tr(v-for="(order, index) in adminStore.orders" :key="order?._id || index" class="text-gray-300")
              td.px-6.py-4.whitespace-nowrap {{ order?.customer?.name || 'İsimsiz' }}
              td.px-6.py-4.whitespace-nowrap {{ order?.type === 'coffee' ? 'Kahve Falı' : 'Rüya Yorumu' }}
              td.px-6.py-4.whitespace-nowrap {{ formatDate(order?.createdAt) }}
              td.px-6.py-4.whitespace-nowrap {{ formatPrice(order?.amount) }}
              td.px-6.py-4.whitespace-nowrap
                span(
                  v-if="order && order.status"
                  :class=[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    { 'bg-yellow-500/20 text-yellow-300': order.status === 'pending' },
                    { 'bg-blue-500/20 text-blue-300': order.status === 'inProgress' },
                    { 'bg-green-500/20 text-green-300': order.status === 'completed' },
                    { 'bg-red-500/20 text-red-300': order.status === 'cancelled' }
                  ]
                ) {{ getStatusText(order.status) }}
                span(v-else) -
      
      template(v-else)
        .text-center.py-8.text-gray-400
          i.fas.fa-inbox.text-4xl.mb-4.block
          p Henüz hiç işlem bulunmuyor.
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAdminStore } from '@/stores/adminStore';
import { Line, Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  ArcElement
} from 'chart.js';

// Chart.js bileşenlerini kaydet
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  ArcElement
);

const adminStore = useAdminStore();

// Verileri yükle
onMounted(async () => {
  await Promise.all([
    adminStore.fetchDashboardStats(),
    adminStore.fetchRecentOrders()
  ]);
});

// Yardımcı fonksiyonlar
const formatPrice = (price) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(price);
};

const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('tr-TR');
};

const getStatusText = (status) => {
  const statusMap = {
    pending: 'Bekliyor',
    inProgress: 'İşleniyor',
    completed: 'Tamamlandı',
    cancelled: 'İptal Edildi'
  };
  return statusMap[status] || status;
};

// Chart Options
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#fff'
      }
    }
  }
};

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#fff'
      }
    }
  }
};

// Chart Data
const salesChartData = ref({
  labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
  datasets: [{
    label: 'Aylık Satışlar (₺)',
    data: [12000, 19000, 15000, 25000, 22000, 30000],
    borderColor: '#4F46E5',
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    tension: 0.4
  }]
});

const servicesChartData = ref({
  labels: ['Kahve Falı', 'Rüya Yorumu'],
  datasets: [{
    data: [60, 40],
    backgroundColor: ['#4F46E5', '#10B981']
  }]
});
</script>

<style lang="scss" scoped>
.dashboard-page {
  .stat-card {
    @apply p-6 rounded-lg text-white flex items-center space-x-4;

    .stat-icon {
      @apply text-3xl opacity-80;
    }

    .stat-content {
      h3 {
        @apply text-sm font-medium opacity-80;
      }

      .stat-value {
        @apply text-2xl font-bold mt-1;
      }
    }
  }

  .chart-card {
    @apply bg-white/5 p-6 rounded-lg;
  }

  .recent-transactions {
    @apply bg-white/5 p-6 rounded-lg;
  }
}
</style>
