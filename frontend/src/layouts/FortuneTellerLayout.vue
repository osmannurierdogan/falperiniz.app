<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <nav class="fixed top-0 left-0 h-full w-64 bg-indigo-800 text-white p-4">
      <div class="mb-8">
        <h2 class="text-2xl font-bold">Falcı Paneli</h2>
      </div>

      <ul class="space-y-2">
        <li>
          <router-link :to="{ name: 'fortune-teller-dashboard' }" class="block px-4 py-2 rounded hover:bg-indigo-700"
            active-class="bg-indigo-700">
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'fortune-teller-readings' }" class="block px-4 py-2 rounded hover:bg-indigo-700"
            active-class="bg-indigo-700">
            Fal Okumaları
          </router-link>
        </li>
      </ul>

      <div class="absolute bottom-4 left-0 w-full px-4">
        <button @click="logout" class="w-full px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
          Çıkış Yap
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="ml-64 p-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
  router.push({ name: 'login' });
};
</script>
