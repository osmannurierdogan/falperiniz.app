import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'

export function useForm(initialState = {}, options = {}) {
  const toast = useToast()
  const form = reactive({ ...initialState })
  const errors = ref({})
  const loading = ref(false)

  const resetForm = () => {
    Object.keys(form).forEach((key) => {
      form[key] = initialState[key]
    })
    errors.value = {}
  }

  const handleSubmit = async (submitFn) => {
    try {
      loading.value = true
      errors.value = {}
      await submitFn(form)

      if (options.resetOnSuccess) {
        resetForm()
      }

      if (options.successMessage) {
        toast.success(options.successMessage)
      }

      return true
    } catch (error) {
      if (error.response?.data?.errors) {
        errors.value = error.response.data.errors
      }

      const errorMessage =
        error.response?.data?.message || options.errorMessage || 'Bir hata oluştu'
      toast.error(errorMessage)

      return false
    } finally {
      loading.value = false
    }
  }

  const setErrors = (newErrors) => {
    errors.value = newErrors
  }

  return {
    form,
    errors,
    loading,
    resetForm,
    handleSubmit,
    setErrors,
  }
}
