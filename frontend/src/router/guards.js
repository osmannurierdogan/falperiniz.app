import { useAuthStore } from '@/stores/authStore'

export async function adminGuard(to, from, next) {
  const authStore = useAuthStore()

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  // Admin değilse yetkisiz sayfasına yönlendir
  if (!authStore.isAdmin) {
    return next({ name: 'unauthorized' })
  }

  // Her şey yolundaysa devam et
  return next()
}

export async function guestGuard(to, from, next) {
  const authStore = useAuthStore()

  // Kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
  if (authStore.isAuthenticated) {
    return next({ name: 'home' })
  }

  return next()
}

export async function fortuneTellerGuard(to, from, next) {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  if (!authStore.isFortuneTeller && !authStore.isAdmin) {
    return next({ name: 'unauthorized' })
  }

  return next()
}

export async function dreamInterpreterGuard(to, from, next) {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  if (!authStore.isDreamInterpreter && !authStore.isAdmin) {
    return next({ name: 'unauthorized' })
  }

  return next()
}
