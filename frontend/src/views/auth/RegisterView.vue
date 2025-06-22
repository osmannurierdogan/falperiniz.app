<template lang="pug">
.register-page.min-h-screen.flex.items-center.justify-center
  .container.max-w-md.w-full.mx-4
    .card(class="bg-white/5 rounded-lg p-6")
      h1.text-2xl.font-semibold.text-white.text-center.mb-6 Kayıt Ol

      form(@submit.prevent="handleSubmit(register)")
        BaseInput(
          id="name"
          v-model="form.name"
          label="Ad Soyad"
          required
          :error="errors.name"
        )

        BaseInput(
          id="email"
          v-model="form.email"
          type="email"
          label="E-posta"
          required
          :error="errors.email"
        )

        BaseInput(
          id="password"
          v-model="form.password"
          type="password"
          label="Şifre"
          required
          :error="errors.password"
        )

        BaseInput(
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          label="Şifre Tekrar"
          required
          :error="errors.password_confirmation"
        )

        .flex.items-center.mb-6
          input#terms.form-checkbox(
            type="checkbox"
            v-model="form.terms"
            required
          )
          label.text-sm.text-gray-300.ml-2(
            for="terms"
          )
            | Kullanım şartlarını ve 
            a(
              href="#"
              target="_blank"
              class="text-primary-500 hover:text-primary-400"
            ) gizlilik politikasını
            |  kabul ediyorum.

        BaseButton(
          type="submit"
          :loading="loading"
          loading-text="Kayıt Yapılıyor..."
          class="w-full"
        ) Kayıt Ol

      .text-center.mt-6
        router-link(
          to="/login"
          class="text-sm text-gray-400 hover:text-white"
        ) Zaten hesabınız var mı? Giriş yapın
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useForm } from '@/composables/useForm'
import { useAuthStore } from '@/stores/authStore'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const { form, errors, loading, handleSubmit } = useForm(
  {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false
  }
)

const register = async () => {
  const success = await authStore.register(form)
  if (success) {
    // Admin rolüne sahip kullanıcıları admin sayfasına, diğerlerini ana sayfaya yönlendir
    const redirectPath = authStore.isAdmin ? '/admin' : '/'
    await router.push(redirectPath)
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  .form-input {
    @apply w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white;
    @apply focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500;

    &::placeholder {
      @apply text-gray-400;
    }
  }

  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;

    &.btn-primary {
      @apply bg-primary-500 text-white;
      @apply hover:bg-primary-600;
      @apply disabled:opacity-50 disabled:cursor-not-allowed;
    }
  }
}
</style>
