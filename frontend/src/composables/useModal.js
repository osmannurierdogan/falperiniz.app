import { ref } from 'vue'

export function useModal(options = {}) {
  const isOpen = ref(false)
  const loading = ref(false)

  const open = () => {
    isOpen.value = true
    if (options.onOpen) {
      options.onOpen()
    }
  }

  const close = () => {
    isOpen.value = false
    loading.value = false
    if (options.onClose) {
      options.onClose()
    }
  }

  const handleConfirm = async (confirmFn) => {
    try {
      loading.value = true
      await confirmFn()
      close()
    } catch (error) {
      console.error('Modal confirm error:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    isOpen,
    loading,
    open,
    close,
    handleConfirm,
  }
}
