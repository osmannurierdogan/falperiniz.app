<template lang="pug">
button.btn(
  :class="buttonClasses"
  :type="type"
  :disabled="loading || disabled"
)
  .flex.items-center.justify-center
    .spinner.mr-2(
      v-if="loading"
    )
    span(v-if="loading") {{ loadingText }}
    slot(v-else)
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'outline'].includes(value)
  },
  type: {
    type: String,
    default: 'button'
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'Yükleniyor...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})

const buttonClasses = computed(() => [
  props.variant === 'primary' ? 'btn-primary' : 'btn-outline',
  { 'w-full': props.block }
])
</script>

<style lang="scss" scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-colors duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;

  &.btn-primary {
    @apply bg-primary-500 text-white;
    @apply hover:bg-primary-600;
    @apply focus:ring-primary-500;
  }

  &.btn-outline {
    @apply border border-white/20 text-white;
    @apply hover:bg-white/10;
    @apply focus:ring-white;
  }
}

.spinner {
  @apply w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin;
}
</style>
