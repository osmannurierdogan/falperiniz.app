<template lang="pug">
.form-group(class="mb-4")
  label.text-sm.text-gray-300(
    v-if="label"
    :for="id"
  ) {{ label }}
  
  input.form-input(
    :id="id"
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    :class="{ 'border-red-500': error }"
  )

  .text-red-500.text-sm.mt-1(v-if="error") {{ error }}

  slot(name="after")
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  id: {
    type: String,
    required: true
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.form-input {
  @apply w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white;
  @apply focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500;

  &::placeholder {
    @apply text-gray-400;
  }

  &.border-red-500 {
    @apply focus:border-red-500 focus:ring-red-500;
  }
}
</style>
