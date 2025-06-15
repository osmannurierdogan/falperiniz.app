<template lang="pug">
.payment-success
  .success-card
    .success-icon
      i.fas.fa-check-circle
    
    h1 Ödeme Başarılı!
    p.message Ödemeniz başarıyla tamamlandı. En kısa sürede falınız yorumlanacak ve size bildirilecek.
    
    .info-box
      h2 Bundan Sonra Ne Olacak?
      ul
        li
          i.fas.fa-envelope
          span E-posta adresinize bir bilgilendirme maili göndereceğiz
        li
          i.fas.fa-clock
          span Falınız 24 saat içinde yorumlanacak
        li
          i.fas.fa-bell
          span Yorum hazır olduğunda size bildirim göndereceğiz
    
    .actions
      router-link.btn-home(to="/")
        i.fa-solid.fa-house
        | Ana Sayfaya Dön
      a.btn-whatsapp(href="https://wa.me/+905555555555" target="_blank")
        i.fab.fa-whatsapp
        | Bize Ulaşın
</template>

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
}

.success-icon {
  font-size: 5rem;
  color: #4ade80;
  margin-bottom: 1.5rem;
  
  i {
    filter: drop-shadow(0 4px 8px rgba(74, 222, 128, 0.3));
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

.info-box {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  h2 {
    color: white;
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 1rem;
      text-align: left;
      
      i {
        font-size: 1.2rem;
        margin-right: 1rem;
        color: #4ade80;
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
    text-decoration: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    
    i {
      font-size: 1.2rem;
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
