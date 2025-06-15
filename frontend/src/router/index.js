import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DreamView from '@/views/dream/DreamView.vue'
import CoffeeView from '@/views/coffee/CoffeeView.vue'
import PaymentSuccessView from '@/views/payment/PaymentSuccessView.vue'
import PaymentCancelView from '@/views/payment/PaymentCancelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
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

export default router
