<template lang="pug">
header.site-header(role="banner")
  nav.nav-container(role="navigation" aria-label="Ana Menü")
    .container
      .nav-content
        //- Logo
        router-link.logo(to="/" aria-label="Ana Sayfa")
          span.logo-text Fal Periniz

        //- Desktop Menu
        .desktop-menu(role="menubar")
          router-link.nav-link(
            to="/"
            role="menuitem"
            :class="{ active: $route.path === '/' }"
          ) Ana Sayfa
          
          router-link.nav-link(
            :to="{ name: 'dream' }"
            role="menuitem"
            :class="{ active: $route.path === '/dream' }"
          ) Rüya Yorumu
          
          router-link.nav-link(
            :to="{ name: 'coffee' }"
            role="menuitem"
            :class="{ active: $route.path === '/coffee' }"
          ) Kahve Falı
          
          router-link.nav-link(
            :to="{ name: 'about' }"
            role="menuitem"
            :class="{ active: $route.path === '/about' }"
          ) Hakkımızda
          
          router-link.nav-link(
            href="https://falperiniz.com/blogs/ne-anlama-gelir"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
          ) Blog
          
          .auth-buttons
            router-link.btn.btn-outline(
              :to="{ name: 'login' }"
              role="menuitem"
            ) Giriş Yap
            router-link.btn.btn-primary(
              :to="{ name: 'register' }"
              role="menuitem"
            ) Üye Ol
</template>

<script setup lang="ts">
// Kullanılmayan importlar ve değişkenler kaldırıldı
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables';

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba($primary, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba($primary, 0.95);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }
}

.nav-container {
  padding: 1rem 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(45deg, $secondary, $accent);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.desktop-menu {
  display: flex;
  align-items: center;
  gap: 2rem;

  .nav-link {
    color: $white;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    opacity: 0.8;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(45deg, $secondary, $accent);
      transition: width 0.3s ease;
    }

    &:hover,
    &.active {
      opacity: 1;
      transform: translateY(-2px);

      &::after {
        width: 100%;
      }
    }
  }

  .auth-buttons {
    display: flex;
    gap: 1rem;
    margin-left: 2rem;

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;

      &.btn-outline {
        color: $white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: transparent;

        &:hover {
          border-color: $secondary;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
      }

      &.btn-primary {
        background: linear-gradient(45deg, $secondary, $accent);
        color: $white;
        border: none;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba($secondary, 0.3);
        }
      }
    }
  }
}
</style>
