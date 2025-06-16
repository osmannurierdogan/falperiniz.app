<template lang="pug">
.modal(
  v-if="modelValue"
  @click.self="$emit('update:modelValue', false)"
  class="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
)
  .modal-content(
    class="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4"
  )
    .flex.items-center.justify-between.mb-6
      h3.text-xl.font-semibold.text-white {{ title }}
      button.text-gray-400.hover:text-white(
        @click="$emit('update:modelValue', false)"
      )
        i.fas.fa-times

    slot

    .flex.justify-end.mt-6(class="space-x-3")
      slot(name="footer")
        BaseButton(
          variant="outline"
          @click="$emit('update:modelValue', false)"
        ) İptal
        
        BaseButton(
          :loading="loading"
          :loading-text="loadingText"
          @click="$emit('confirm')"
        ) {{ confirmText }}
</template>

<script setup>
import BaseButton from './BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'Yükleniyor...'
  },
  confirmText: {
    type: String,
    default: 'Kaydet'
  }
})

defineEmits(['update:modelValue', 'confirm'])
</script>

<style lang="scss" scoped>
.modal {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.modal-content {
  animation: slideIn 0.2s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
