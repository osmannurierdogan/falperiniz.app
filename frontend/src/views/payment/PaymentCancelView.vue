<template lang="pug">
.payment-cancel
  .cancel-card
    .cancel-icon
      i.fas.fa-times-circle
    
    h1 Ödeme Tamamlanamadı
    p.message Ödeme işleminiz maalesef tamamlanamadı. Endişelenmeyin, hesabınızdan herhangi bir ücret tahsil edilmedi.
    
    .help-box
      h2 Size Nasıl Yardımcı Olabiliriz?
      .options
        .option
          i.fas.fa-sync
          h3 Tekrar Deneyin
          p Ödeme işlemini tekrar deneyebilirsiniz. Genellikle geçici sorunlar ikinci denemede çözülür.
          router-link.btn-retry(:to="previousPage")
            | Tekrar Dene
        
        .option
          i.fas.fa-headset
          h3 Destek Alın
          p Sorun devam ederse müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyacaktır.
          .support-buttons
            a.btn-whatsapp(href="https://wa.me/+905555555555" target="_blank")
              i.fab.fa-whatsapp
              | WhatsApp
            a.btn-email(href="mailto:destek@falperiniz.com")
              i.fas.fa-envelope
              | E-posta
    
    .actions
      router-link.btn-home(to="/")
        i.fas.fa-home
        | Ana Sayfaya Dön
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

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
}

.cancel-icon {
  font-size: 5rem;
  color: #f87171;
  margin-bottom: 1.5rem;
  
  i {
    filter: drop-shadow(0 4px 8px rgba(248, 113, 113, 0.3));
  }
}

h1 {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: 700;
}

.message {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.help-box {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  h2 {
    color: white;
    font-size: 1.3rem;
    margin-bottom: 2rem;
  }
}

.options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  .option {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    
    i {
      font-size: 2rem;
      color: #4ade80;
      margin-bottom: 1rem;
    }
    
    h3 {
      color: white;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.support-buttons {
  display: flex;
  gap: 0.5rem;
  
  a {
    flex: 1;
    padding: 0.75rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }
}

.btn-retry,
.btn-home,
.btn-whatsapp,
.btn-email {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-retry {
  background: #4ade80;
  color: white;
  
  &:hover {
    background: #22c55e;
  }
}

.btn-home {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.btn-whatsapp {
  background: #25d366;
  color: white;
  
  &:hover {
    background: #22c55e;
  }
}

.btn-email {
  background: #3b82f6;
  color: white;
  
  &:hover {
    background: #2563eb;
  }
}

.actions {
  margin-top: 2rem;
}

@media (max-width: 640px) {
  .cancel-card {
    padding: 2rem;
  }
  
  .options {
    grid-template-columns: 1fr;
  }
  
  .support-buttons {
    flex-direction: column;
  }
}
</style> 
