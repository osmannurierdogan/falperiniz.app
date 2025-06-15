<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template lang="pug">
#app
  TheHeader
  RouterView
  TheFooter
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

#app {
  min-height: 100vh;
  padding-top: 35px; // Header yüksekliği kadar padding
  display: flex;
  flex-direction: column;

  .router-view {
    flex: 1;
  }
}
</style>
