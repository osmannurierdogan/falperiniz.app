import { useAuthStore } from '@/stores/authStore'

export default async function adminGuard(to, from, next) {
  const authStore = useAuthStore()

  try {
    // Token kontrolü ve kullanıcı bilgilerini al
    const isAuthenticated = await authStore.checkAuth()

    if (!isAuthenticated) {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      return next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }

    if (!authStore.isAdmin) {
      // Kullanıcı admin değilse ana sayfaya yönlendir
      return next({ path: '/' })
    }

    // Admin kullanıcı için devam et
    return next()
  } catch (error) {
    console.error('Admin guard error:', error)
    return next({ path: '/login' })
  }
}
