import { useAuthStore } from '@/stores/authStore'

export default async function adminGuard(to, from, next) {
  const authStore = useAuthStore()
  console.log('Admin guard check - Current user:', authStore.user)

  try {
    // Token kontrolü ve kullanıcı bilgilerini al
    const isAuthenticated = await authStore.checkAuth()
    console.log('Is authenticated:', isAuthenticated)
    console.log('Is admin:', authStore.isAdmin)

    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login')
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      return next({
        name: 'login',
        query: { redirect: to.fullPath },
      })
    }

    if (!authStore.isAdmin) {
      console.log('Not admin, redirecting to home')
      // Kullanıcı admin değilse ana sayfaya yönlendir
      return next({ name: 'home' })
    }

    console.log('Admin check passed, proceeding')
    // Admin kullanıcı için devam et
    return next()
  } catch (error) {
    console.error('Admin guard error:', error)
    return next({ name: 'login' })
  }
}
