import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DreamView from '@/views/dream/DreamView.vue'
import CoffeeView from '@/views/coffee/CoffeeView.vue'
import PaymentSuccessView from '@/views/payment/PaymentSuccessView.vue'
import PaymentCancelView from '@/views/payment/PaymentCancelView.vue'
import adminGuard from './guards/adminGuard'
import guestGuard from './guards/guestGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Ana Sayfa',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: {
        title: 'Giriş Yap',
        guest: true,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: {
        title: 'Kayıt Ol',
        guest: true,
      },
    },
    {
      path: '/dream',
      name: 'dream',
      component: DreamView,
    },
    {
      path: '/coffee',
      name: 'coffee',
      component: CoffeeView,
    },
    {
      path: '/payment/success',
      name: 'payment-success',
      component: PaymentSuccessView,
    },
    {
      path: '/payment/cancel',
      name: 'payment-cancel',
      component: PaymentCancelView,
    },
    // Admin routes
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      beforeEnter: adminGuard,
      children: [
        {
          path: '',
          redirect: '/admin/orders',
        },
        {
          path: 'orders',
          name: 'AdminOrders',
          component: () => import('@/views/admin/OrdersView.vue'),
          meta: {
            title: 'Sipariş Yönetimi',
          },
        },
        {
          path: 'products',
          name: 'AdminProducts',
          component: () => import('@/views/admin/ProductsView.vue'),
          meta: {
            title: 'Ürünler',
          },
        },
        {
          path: 'settings',
          name: 'AdminSettings',
          component: () => import('@/views/admin/SettingsView.vue'),
          meta: {
            title: 'Ayarlar',
          },
        },
      ],
    },
  ],
})

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  // Sayfa başlığını güncelle
  document.title = to.meta.title ? `${to.meta.title} - Fal Periniz` : 'Fal Periniz'

  // Guest route kontrolü
  if (to.meta.guest) {
    return guestGuard(to, from, next)
  }

  // Admin route kontrolü
  if (to.matched.some((record) => record.meta.admin)) {
    return adminGuard(to, from, next)
  }

  // Diğer route'lar için devam et
  return next()
})

export default router
