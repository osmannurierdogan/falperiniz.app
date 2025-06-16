<template lang="pug">
.login-page.min-h-screen.flex.items-center.justify-center
  .container.max-w-md.w-full.mx-4
    .card(class="bg-white/5 rounded-lg p-6")
      h1.text-2xl.font-semibold.text-white.text-center.mb-6 Giriş Yap

      form(@submit.prevent="handleSubmit(login)")
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

        .flex.justify-between.items-center.mb-6
          .flex.items-center
            input#remember.form-checkbox(
              type="checkbox"
              v-model="form.remember"
            )
            label.text-sm.text-gray-300.ml-2(
              for="remember"
            ) Beni Hatırla

          router-link(
            to="/auth/forgot-password"
            class="text-sm text-primary-500 hover:text-primary-400"
          ) Şifremi Unuttum

        BaseButton(
          type="submit"
          :loading="loading"
          loading-text="Giriş Yapılıyor..."
          class="w-full"
        ) Giriş Yap

      .text-center.mt-6
        router-link(
          to="/auth/register"
          class="text-sm text-gray-400 hover:text-white"
        ) Hesabınız yok mu? Kayıt olun
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
    email: '',
    password: '',
    remember: false
  },
  {
    successMessage: 'Giriş başarılı'
  }
)

const login = async () => {
  await authStore.login(form)
  router.push('/admin')
}
</script>

<style lang="scss" scoped>
.login-page {
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
