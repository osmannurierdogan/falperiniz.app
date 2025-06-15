import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: {
      coffee: {
        id: 'coffee-fortune',
        name: 'Kahve Falı',
        price: 299.99,
        description: 'Kahve falınıza profesyonel falcılarımız bakıyor',
        imageUrl: '/images/coffee-fortune.jpg',
      },
      dream: {
        id: 'dream-interpretation',
        name: 'Rüya Yorumu',
        price: 49.99,
        description: 'Rüyanızı profesyonel rüya yorumcularımız yorumluyor',
        imageUrl: '/images/dream-interpretation.jpg',
      },
    },
    selectedProduct: null,
  }),

  getters: {
    getProduct: (state) => (productId) => {
      return state.products[productId]
    },
    getSelectedProduct: (state) => {
      return state.selectedProduct
    },
  },

  actions: {
    setSelectedProduct(productId) {
      this.selectedProduct = this.products[productId]
    },
  },
})
