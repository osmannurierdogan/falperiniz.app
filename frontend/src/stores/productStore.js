import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: {
      coffee: {
        id: 'coffee-fortune',
        name: 'Kahve Falı',
        description: 'Kahve Falı Yorumu',
        price: 299.99,
        type: 'coffee'
      },
      dream: {
        id: 'dream-interpretation',
        name: 'Rüya Yorumu',
        description: 'Rüya Yorumu Hizmeti',
        price: 49.99,
        type: 'dream'
      }
    }
  }),

  getters: {
    getProduct: (state) => (type) => {
      return state.products[type]
    },
    
    getAllProducts: (state) => {
      return Object.values(state.products)
    }
  }
}) 
