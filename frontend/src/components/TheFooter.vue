<template lang="pug">
footer.footer
  .container
    .footer-grid
      .footer-section.logo-section
        //- .logo-placeholder
          i.fas.fa-moon.fa-3x
        img(src="/images/falperiniz-logo.png" alt="Fal Periniz" class="logo")
        h2.company-name Fal Periniz
        p.company-desc Kahve falı ve burçlara dair her şey...

      .footer-section
        h3 Politikalarımız
        ul
          li
            router-link(to="/hizmet-kosullari") Hizmet Koşulları
          li
            router-link(to="/gizlilik-politikasi") Gizlilik Politikası
          li
            router-link(to="/kargo-politikasi") Kargo Politikası
          li
            router-link(to="/iade-politikasi") İade Politikası
          li
            router-link(to="/iletisim") İletişim

      .footer-section
        h3 Site Haritası
        ul
          li
            router-link(to="/") Ana Sayfa
          li
            router-link(to="/kahve-fali") Kahve Falı
          li
            router-link(to="/burclar") Burçlar
          li
            router-link(to="/ne-anlama-gelir") Ne Anlama Gelir?
          li
            router-link(to="/magaza") Mağaza

      .footer-section.newsletter
        h3 Mail Bültenimize Abone Ol
        p Abone ol ve kampanyalarımızdan haberdar ol!
        form.newsletter-form(@submit.prevent="handleSubscribe")
          input(
            type="email"
            v-model="email"
            placeholder="E-posta adresiniz"
            required
          )
          button.btn-subscribe(type="submit")
            span.icon-wrapper
              EnvelopeIcon
              | Abone Ol

    .footer-bottom
      .copyright-section
        p.copyright
          | Copyright © {{ new Date().getFullYear() }} Fal Periniz. Tüm hakları saklıdır.

      .payment-methods
        h4 Güvenli Ödeme Yöntemleri
        .payment-icons
          i.fab.fa-cc-visa
          i.fab.fa-cc-mastercard
          i.fab.fa-cc-amex
          i.fab.fa-apple-pay
          i.fab.fa-google-pay

      .social-links
        a(href="#" target="_blank" rel="noopener noreferrer")
          span.icon-wrapper
            | Instagram
        a(href="#" target="_blank" rel="noopener noreferrer")
          span.icon-wrapper
            | Facebook
        a(href="#" target="_blank" rel="noopener noreferrer")
          span.icon-wrapper
            | Twitter
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopeIcon } from '@heroicons/vue/24/solid'

const email = ref('')

const handleSubscribe = () => {
  // TODO: Implement newsletter subscription logic
  console.log('Subscribe:', email.value)
  email.value = ''
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

.footer {
  background: linear-gradient(to right, #4a2b5f, #2d1b47);
  padding: 4rem 0 2rem;

  .container {
    max-width: $desktop;
    margin: 0 auto;
    padding: 0 2rem;
  }
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;

    .newsletter {
      grid-column: 1 / -1;
      width: 100%;
    }
  }
}

.logo-section {
  img {
    width: 100%;
    height: auto;
    max-width: 200px;
    margin-bottom: 1rem;
  }

  .logo-placeholder {
    margin-bottom: 1rem;
    color: #e83e8c;

    i {
      filter: drop-shadow(0 0 10px rgba(232, 62, 140, 0.3));
    }
  }

  .company-name {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #e83e8c;
  }

  .company-desc {
    color: rgba($white, 0.7);
    font-size: 0.9rem;
  }
}

.footer-section {
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: #e83e8c;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.8rem;

      a {
        color: rgba($white, 0.7);
        transition: $transition-normal;

        &:hover {
          color: #e83e8c;
          text-decoration: none;
        }
      }
    }
  }
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;

  input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid rgba($white, 0.1);
    border-radius: $radius-md;
    background: rgba($white, 0.05);
    color: $white;

    &::placeholder {
      color: rgba($white, 0.5);
    }
  }

  .btn-subscribe {
    width: 100%;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: $radius-md;
    background: #e83e8c;
    color: $white;
    cursor: pointer;
    transition: $transition-normal;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: darken(#e83e8c, 10%);
    }

    i {
      margin-right: 0.5rem;
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba($white, 0.1);
  gap: 2rem;

  .copyright-section {
    p.copyright {
      color: rgba($white, 0.7);
      font-size: 1rem;
      margin-bottom: 0;
    }
  }

  .payment-methods {
    text-align: center;

    h4 {
      font-size: 0.9rem;
      color: rgba($white, 0.7);
      margin-bottom: 0.5rem;
    }

    .payment-icons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      font-size: 1.5rem;
      color: rgba($white, 0.7);
    }
  }

  .social-links {
    display: flex;
    gap: 1rem;

    a {
      color: rgba($white, 0.7);
      font-size: 1.5rem;
      transition: $transition-normal;

      &:hover {
        color: #e83e8c;
      }
    }
  }
}

@include responsive(mobile) {
  .footer {
    padding: 3rem 0 1.5rem;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;

    .payment-methods {
      order: -1;
    }
  }
}

@include responsive(tablet) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    .logo-section {
      grid-column: 1 / -1;
      text-align: center;

      .logo-placeholder {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
