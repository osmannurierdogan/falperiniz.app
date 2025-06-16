import { useAuthStore } from '@/stores/authStore'

export default async function guestGuard(to, from, next) {
  const authStore = useAuthStore()

  try {
    // Token kontrolü
    const isAuthenticated = await authStore.checkAuth()

    if (isAuthenticated) {
      // Kullanıcı zaten giriş yapmışsa yönlendirilecek sayfa veya ana sayfa
      return next(to.query.redirect || '/')
    }

    // Giriş yapmamış kullanıcı için devam et
    return next()
  } catch (error) {
    console.error('Guest guard error:', error)
    return next()
  }
}
