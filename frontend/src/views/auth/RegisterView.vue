<template lang="pug">
.register-page(class="min-h-screen bg-gradient-elegant from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8")
  .container(class="max-w-md w-full")
    .card(class="relative")
      .absolute(class="-inset-1 bg-gradient-elegant from-primary-500 to-secondary-500 rounded-2xl blur opacity-25")
      .relative
        .text-center(class="mb-8")
          h1(class="text-4xl font-bold mb-2 bg-gradient-elegant from-primary-600 to-secondary-600 bg-clip-text text-transparent") Kayıt Ol
          p(class="text-gray-600") Hemen ücretsiz hesap oluşturun
        
        form(@submit.prevent="handleRegister")
          .space-y-6
            .form-group
              label.form-label(for="name") Ad Soyad
              input#name.form-input(
                type="text"
                v-model="name"
                placeholder="Ad Soyad"
                required
                class="mt-1"
              )
            
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
              p(class="mt-1 text-sm text-gray-500") En az 6 karakter uzunluğunda olmalıdır
            
            .form-group
              label.form-label(for="passwordConfirm") Şifre Tekrar
              input#passwordConfirm.form-input(
                type="password"
                v-model="passwordConfirm"
                placeholder="••••••••"
                required
                class="mt-1"
              )
            
            .form-group
              .flex(class="items-start")
                input#terms(
                  type="checkbox"
                  v-model="acceptTerms"
                  required
                  class="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                )
                .ml-3
                  label(for="terms" class="text-sm text-gray-600") Kullanım şartlarını ve gizlilik politikasını kabul ediyorum
                  .flex(class="space-x-1 text-sm")
                    a(href="#" class="text-primary-600 hover:text-primary-500") Kullanım Şartları
                    span(class="text-gray-500") ve
                    a(href="#" class="text-primary-600 hover:text-primary-500") Gizlilik Politikası
            
            button(
              type="submit"
              class="btn btn-primary w-full"
              :disabled="!isFormValid"
              :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
            ) Kayıt Ol
        
        .mt-8(class="text-center")
          p(class="text-gray-600")
            | Zaten hesabınız var mı? 
            router-link(
              to="/login"
              class="font-medium text-primary-600 hover:text-primary-500"
            ) Giriş Yapın
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const acceptTerms = ref(false)

const isFormValid = computed(() => {
  return (
    name.value.length > 0 &&
    email.value.length > 0 &&
    password.value.length >= 6 &&
    password.value === passwordConfirm.value &&
    acceptTerms.value
  )
})

const handleRegister = async () => {
  try {
    // Backend bağlantısı yapılacak
    console.log('Register attempt:', {
      name: name.value,
      email: email.value,
      password: password.value
    })

    // Başarılı kayıt sonrası giriş sayfasına yönlendirme
    router.push('/login')
  } catch (error) {
    console.error('Register error:', error)
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
