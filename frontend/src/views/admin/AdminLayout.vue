<template lang="pug">
.admin-layout
  //- Sidebar
  .sidebar(class="fixed inset-y-0 left-0 w-64 bg-gray-900")
    .sidebar-header(class="h-16 flex items-center px-6 border-b border-gray-800")
      router-link(to="/admin" class="text-xl font-semibold text-white") Admin Panel
    
    nav.sidebar-nav(class="mt-6")
      .sidebar-menu
        router-link.menu-item(
          to="/admin"
          :class="{ active: $route.path === '/admin' }"
          class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        )
          i.fas.fa-tachometer-alt(class="mr-3")
          span Dashboard
        
        router-link.menu-item(
          to="/admin/orders"
          :class="{ active: $route.path === '/admin/orders' }"
          class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        )
          i.fas.fa-shopping-cart(class="mr-3")
          span Siparişler
        
        router-link.menu-item(
          to="/admin/products"
          :class="{ active: $route.path === '/admin/products' }"
          class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        )
          i.fas.fa-box(class="mr-3")
          span Ürünler
        
        router-link.menu-item(
          to="/admin/settings"
          :class="{ active: $route.path === '/admin/settings' }"
          class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        )
          i.fas.fa-cog(class="mr-3")
          span Ayarlar
    
    .sidebar-footer(class="absolute bottom-0 left-0 right-0 p-4")
      button.logout-btn(
        @click="handleLogout"
        class="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      )
        i.fas.fa-sign-out-alt(class="mr-2")
        span Çıkış Yap

  //- Main Content
  .main-content(class="ml-64 min-h-screen")
    .header(class="h-16 flex items-center justify-between px-8 border-b border-gray-200 bg-white/5")
      h1.text-xl.font-semibold.text-white {{ currentPageTitle }}
      .user-info(class="flex items-center")
        span.text-gray-300 {{ authStore.user?.name }}
        img.avatar(
          :src="authStore.user?.avatar || '/default-avatar.png'"
          alt="User avatar"
          class="w-8 h-8 rounded-full ml-3"
        )
    
    .content(class="p-8")
      router-view
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const currentPageTitle = computed(() => route.meta.title || 'Admin Panel')

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.admin-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.sidebar {
  backdrop-filter: blur(10px);
  background: rgba(17, 24, 39, 0.95);
  z-index: 10;

  .menu-item {
    &.active {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
    }
  }
}

.main-content {
  padding-left: 16rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.header {
  position: sticky;
  top: 0;
  z-index: 5;
  backdrop-filter: blur(10px);
}

.content {
  min-height: calc(100vh - 4rem);
}

.nav-item {
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
}

.logout-btn {
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}
</style>
