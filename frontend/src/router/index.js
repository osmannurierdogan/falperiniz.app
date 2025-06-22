import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DreamView from '../views/dream/DreamView.vue'
import CoffeeView from '../views/coffee/CoffeeView.vue'
import PaymentSuccessView from '../views/payment/PaymentSuccessView.vue'
import PaymentCancelView from '../views/payment/PaymentCancelView.vue'
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
  ],
})

// Global navigation guard - sadece sayfa başlığını günceller
router.beforeEach(async (to, from, next) => {
  // Sayfa başlığını güncelle
  document.title = to.meta.title ? `${to.meta.title} - Fal Periniz` : 'Fal Periniz'
  next()
})

export default router
