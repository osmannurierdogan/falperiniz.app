<template lang="pug">
.login-page(class="min-h-screen bg-gradient-elegant from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8")
  .container(class="max-w-md w-full")
    .card(class="relative")
      .absolute(class="-inset-1 bg-gradient-elegant from-primary-500 to-secondary-500 rounded-2xl blur opacity-25")
      .relative
        .text-center(class="mb-8")
          h1(class="text-4xl font-bold mb-2 bg-gradient-elegant from-primary-600 to-secondary-600 bg-clip-text text-transparent") Hoş Geldiniz
          p(class="text-gray-600") Hesabınıza giriş yapın
        
        form(@submit.prevent="handleLogin")
          .space-y-6
            .form-group
              label.form-label(for="email") E-posta Adresi
              input#email.form-input(
                type="email"
                v-model="email"
                placeholder="ornek@email.com"
                required
                class="mt-1"
              )
            
            .form-group
              label.form-label(for="password") Şifre
              input#password.form-input(
                type="password"
                v-model="password"
                placeholder="••••••••"
                required
                class="mt-1"
              )
            
            .flex(class="items-center justify-between")
              .flex(class="items-center")
                input#remember(
                  type="checkbox"
                  v-model="rememberMe"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                )
                label(for="remember" class="ml-2 block text-sm text-gray-600") Beni Hatırla
              
              router-link(
                to="/forgot-password"
                class="text-sm font-medium text-primary-600 hover:text-primary-500"
              ) Şifremi Unuttum
            
            button(
              type="submit"
              class="btn btn-primary w-full mt-6"
            ) Giriş Yap
        
        .mt-8(class="text-center")
          p(class="text-gray-600")
            | Hesabınız yok mu? 
            router-link(
              to="/register"
              class="font-medium text-primary-600 hover:text-primary-500"
            ) Hemen Kayıt Olun
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = async () => {
  try {
    // Backend bağlantısı yapılacak
    console.log('Login attempt:', {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    })

    // Başarılı giriş sonrası ana sayfaya yönlendirme
    router.push('/')
  } catch (error) {
    console.error('Login error:', error)
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  @apply relative;

  &:focus-within label {
    @apply text-primary-500;
  }
}
</style>
