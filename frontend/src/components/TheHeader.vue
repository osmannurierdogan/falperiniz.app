<template lang="pug">
header.site-header(role="banner")
  nav.nav-container(role="navigation" aria-label="Ana Menü")
    .container
      .nav-content
        //- Logo
        router-link.logo(to="/" aria-label="Ana Sayfa")
          span.logo-text Fal Periniz

        //- Mobile Menu Button
        button.mobile-menu-button(
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Menüyü Aç/Kapat"
        )
          Bars3Icon(v-if="!isMenuOpen")
          XMarkIcon(v-else)

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

        //- Mobile Menu
        .mobile-menu#mobile-menu(
          :class="{ 'is-open': isMenuOpen }"
          role="menu"
          aria-label="Mobil Menü"
        )
          router-link.mobile-nav-link(
            to="/"
            role="menuitem"
            :class="{ active: $route.path === '/' }"
            @click="isMenuOpen = false"
          ) Ana Sayfa
          
          router-link.mobile-nav-link(
            :to="{ name: 'dream' }"
            role="menuitem"
            :class="{ active: $route.path === '/dream' }"
            @click="isMenuOpen = false"
          ) Rüya Yorumu
          
          router-link.mobile-nav-link(
            :to="{ name: 'coffee' }"
            role="menuitem"
            :class="{ active: $route.path === '/coffee' }"
            @click="isMenuOpen = false"
          ) Kahve Falı
          
          router-link.mobile-nav-link(
            :to="{ name: 'about' }"
            role="menuitem"
            :class="{ active: $route.path === '/about' }"
            @click="isMenuOpen = false"
          ) Hakkımızda
          
          router-link.mobile-nav-link(
            href="https://falperiniz.com/blogs/ne-anlama-gelir"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            @click="isMenuOpen = false"
          ) Blog
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid'

const isMenuOpen = ref(false)
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
  z-index: 1001; // Logo her zaman üstte olsun

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

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  color: $white;
  padding: 0.5rem;
  cursor: pointer;
  z-index: 1001; // Menü butonu her zaman üstte olsun

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    display: block;
  }
}

.desktop-menu {
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }

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
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: min-content;
  max-height: 100vh;
  background: linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 100%);
  padding: 5rem 2rem 2rem;
  transform: translateX(100%);
  transition: all 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: -1;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  &.is-open {
    transform: translateX(0);
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.3);
  }

  .mobile-nav-link {
    color: $white;
    text-decoration: none;
    font-size: 1.25rem;
    font-weight: 500;
    padding: 0.75rem;
    transition: all 0.3s ease;
    position: relative;
    opacity: 0.8;
    width: 100%;
    text-align: center;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: linear-gradient(45deg, $secondary, $accent);
      transition: width 0.3s ease;
    }

    &:hover,
    &.active {
      opacity: 1;
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);

      &::after {
        width: 50%;
      }
    }
  }
}
</style>
