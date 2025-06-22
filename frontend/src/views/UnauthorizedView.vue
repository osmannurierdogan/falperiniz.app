<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Yetkisiz Erişim
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Bu sayfaya erişim yetkiniz bulunmamaktadır.
        </p>
      </div>
      <div class="mt-5">
        <router-link
          :to="{ name: 'login' }"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Giriş Sayfasına Dön
        </router-link>
      </div>
    </div>
  </div>
</template> 
