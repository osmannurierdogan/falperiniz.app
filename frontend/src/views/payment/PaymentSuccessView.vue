<template lang="pug">
.payment-success
  .success-card
    .success-icon
      CheckCircleIcon.w-5.h-5
    
    h1 Ödeme Başarılı!
    p.message Ödemeniz başarıyla tamamlandı. En kısa sürede falınız yorumlanacak ve size bildirilecek.
    
    .info-box
      h2 Bundan Sonra Ne Olacak?
      ul
        li
          span.icon-wrapper
            EnvelopeIcon.w-5.h-5
            span E-posta adresinize bir bilgilendirme maili göndereceğiz
        li
          span.icon-wrapper
            ClockIcon.w-5.h-5
            span Falınız 24 saat içinde yorumlanacak
        li
          span.icon-wrapper
            BellIcon.w-5.h-5
            span Yorum hazır olduğunda size bildirim göndereceğiz
    
    .actions
      router-link.btn-home(to="/")
        span.icon-wrapper
          HomeIcon.w-5.h-5
          | Ana Sayfaya Dön
      a.btn-whatsapp(href="https://wa.me/+905555555555" target="_blank")
        span.icon-wrapper
          ChatBubbleLeftRightIcon.w-5.h-5
          | Bize Ulaşın
    
    .debug-section(v-if="isDevelopment")
      h3 Geliştirici Modu
      p.note Bu bölüm sadece geliştirme ortamında görünür.
      p Session ID: {{ sessionId }}
      button.debug-button(@click="simulateWebhook")
        span.icon-wrapper
          CodeBracketIcon.w-5.h-5
          | Webhook Simüle Et
      .debug-result(v-if="webhookResult")
        pre {{ JSON.stringify(webhookResult, null, 2) }}
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from '@/plugins/axios';
import {
  CheckCircleIcon,
  EnvelopeIcon,
  ClockIcon,
  BellIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon
} from '@heroicons/vue/24/solid';

const route = useRoute();
const sessionId = ref('');
const webhookResult = ref(null);
const isDevelopment = computed(() => import.meta.env.MODE === 'development');

onMounted(() => {
  // URL'den session_id'yi al
  sessionId.value = route.query.session_id || '';
});

// Webhook simülasyonu
const simulateWebhook = async () => {
  if (!sessionId.value) {
    alert('Session ID bulunamadı!');
    return;
  }

  try {
    const response = await axios.post('/api/payments/simulate-webhook', {
      session_id: sessionId.value,
      customer_email: 'test@example.com',
      customer_name: 'Test Kullanıcı',
      items: [
        {
          type: 'dream',
          amount: 100
        }
      ]
    });

    webhookResult.value = response.data;
    alert('Webhook simülasyonu başarılı! Veritabanı kayıtları oluşturuldu.');
  } catch (error) {
    console.error('Webhook simülasyonu hatası:', error);
    webhookResult.value = {
      error: error.response?.data?.message || error.message
    };
    alert('Webhook simülasyonu başarısız! Detaylar için konsolu kontrol edin.');
  }
};
</script>

<style scoped lang="scss">
.payment-success {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.success-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 1.5rem;
  text-align: center;
  max-width: 600px;
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

.info-box {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      text-align: left;

      .icon-wrapper {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #4ade80;

        span {
          color: white;
          opacity: 0.9;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  a {
    flex: 1;
    min-width: 200px;
    padding: 1rem;
    border-radius: 0.75rem;
    font-weight: 500;
    transition: all 0.2s ease;

    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
  }

  .btn-home {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .btn-whatsapp {
    background: #25d366;
    color: white;

    &:hover {
      background: darken(#25d366, 5%);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

.debug-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  text-align: left;

  h3 {
    color: #f59e0b;
    margin-bottom: 0.5rem;
  }

  .note {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .debug-button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    .icon-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    &:hover {
      background: darken(#3b82f6, 5%);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .debug-result {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    overflow-x: auto;

    pre {
      font-family: monospace;
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

@media (max-width: 640px) {
  .success-card {
    padding: 2rem;
  }

  .actions {
    flex-direction: column;

    a {
      width: 100%;
    }
  }
}
</style>
