<template lang="pug">
.payment-cancel
  .cancel-card
    .cancel-icon
      XCircleIcon.w-5.h-5
    
    h1 Ödeme Tamamlanamadı
    p.message Ödeme işleminiz maalesef tamamlanamadı. Endişelenmeyin, hesabınızdan herhangi bir ücret tahsil edilmedi.
    
    .help-box
      h2 Size Nasıl Yardımcı Olabiliriz?
      .options
        .option
          .icon-wrapper
            ArrowPathIcon.w-5.h-5
          h3 Tekrar Deneyin
          p Ödeme işlemini tekrar deneyebilirsiniz. Genellikle geçici sorunlar ikinci denemede çözülür.
          router-link.btn-retry(:to="previousPage")
            span.icon-wrapper
              span Tekrar Dene
              ArrowRightIcon.w-5.h-5
        
        .option
          .icon-wrapper
            ChatBubbleLeftRightIcon.w-5.h-5
          h3 Destek Alın
          p Sorun devam ederse müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyacaktır.
          .support-buttons
            a.btn-whatsapp(href="https://wa.me/+905555555555" target="_blank")
              span.icon-wrapper
                ChatBubbleLeftRightIcon.w-5.h-5
                | WhatsApp
            a.btn-email(href="mailto:destek@falperiniz.com")
              span.icon-wrapper
                EnvelopeIcon.w-5.h-5
                | E-posta
    
    .actions
      router-link.btn-home(to="/")
        span.icon-wrapper
          HomeIcon.w-5.h-5
          | Ana Sayfaya Dön
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  XCircleIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  HomeIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/solid'

const route = useRoute()
const previousPage = computed(() => route.query.from || '/')
</script>

<style scoped lang="scss">
.payment-cancel {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.cancel-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 1.5rem;
  text-align: center;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin: 1.5rem 0;
  }

  .message {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 2rem;
  }
}

.help-box {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;

    .option {
      text-align: center;

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1.25rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }

      p {
        opacity: 0.8;
        margin-bottom: 1.5rem;
      }
    }
  }
}

.support-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;

  a {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &.btn-whatsapp {
      background: #25d366;
      color: white;

      &:hover {
        background: darken(#25d366, 10%);
      }
    }

    &.btn-email {
      background: rgba(255, 255, 255, 0.1);
      color: white;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
}

.btn-retry {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #25d366;
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #4f46e5;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

.actions {
  margin-top: 2rem;

  .btn-home {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
