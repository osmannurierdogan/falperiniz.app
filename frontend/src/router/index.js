import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DreamView from '../views/dream/DreamView.vue'
import CoffeeView from '../views/coffee/CoffeeView.vue'
import PaymentSuccessView from '../views/payment/PaymentSuccessView.vue'
import PaymentCancelView from '../views/payment/PaymentCancelView.vue'
import { adminGuard, fortuneTellerGuard, dreamInterpreterGuard } from './guards'
import guestGuard from './guards/guestGuard'
import AboutView from '../views/AboutView.vue'

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
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'Hakkımızda',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: {
        title: 'Giriş Yap',
        guest: true,
      },
    },
    {
      path: '/register',
      name: 'register',
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
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      beforeEnter: adminGuard,
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/admin/DashboardView.vue'),
          meta: {
            title: 'Admin Dashboard'
          }
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../views/admin/SettingsView.vue'),
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/admin/OrdersView.vue'),
        },
      ],
    },
    {
      path: '/fortune-teller',
      name: 'fortune-teller',
      component: () => import('../layouts/FortuneTellerLayout.vue'),
      beforeEnter: fortuneTellerGuard,
      children: [
        {
          path: '',
          name: 'fortune-teller-dashboard',
          component: () => import('../views/fortune-teller/DashboardView.vue'),
        },
        {
          path: 'readings',
          name: 'fortune-teller-readings',
          component: () => import('../views/fortune-teller/ReadingsView.vue'),
        },
        {
          path: 'readings/:id',
          name: 'fortune-teller-reading-detail',
          component: () => import('../views/fortune-teller/ReadingDetailView.vue'),
        },
        {
          path: 'readings/:id/start',
          name: 'fortune-teller-reading-start',
          component: () => import('../views/fortune-teller/ReadingStartView.vue'),
        },
      ],
    },
    {
      path: '/dream-interpreter',
      name: 'dream-interpreter',
      component: () => import('../layouts/DreamInterpreterLayout.vue'),
      beforeEnter: dreamInterpreterGuard,
      children: [
        {
          path: '',
          name: 'dream-interpreter-dashboard',
          component: () => import('../views/dream-interpreter/DashboardView.vue'),
        },
        {
          path: 'interpretations',
          name: 'dream-interpreter-interpretations',
          component: () => import('../views/dream-interpreter/InterpretationsView.vue'),
        },
        {
          path: 'interpretations/:id',
          name: 'dream-interpreter-interpretation-detail',
          component: () => import('../views/dream-interpreter/InterpretationDetailView.vue'),
        },
        {
          path: 'interpretations/:id/start',
          name: 'dream-interpreter-interpretation-start',
          component: () => import('../views/dream-interpreter/InterpretationStartView.vue'),
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
