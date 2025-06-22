import axios from '@/plugins/axios';

export const interpretationService = {
  async interpretDream(dreamData) {
    try {
      const response = await axios.post('/api/interpretations/dream', dreamData);
      return response.data.interpretation;
    } catch (error) {
      console.error('Rüya yorumu hatası:', error);
      throw new Error(error.response?.data?.error || 'Rüya yorumlanırken bir hata oluştu');
    }
  },

  async interpretCoffeeReading(imageUrls) {
    try {
      const response = await axios.post('/api/interpretations/coffee', { imageUrls });
      return response.data.interpretation;
    } catch (error) {
      console.error('Kahve falı yorumu hatası:', error);
      throw new Error(error.response?.data?.error || 'Kahve falı yorumlanırken bir hata oluştu');
    }
  }
}; 
