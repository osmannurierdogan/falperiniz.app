const OpenAIService = require('../services/OpenAIService');

class InterpretationController {
  async interpretDream(req, res) {
    try {
      const { dreamDescription, dreamDate } = req.body;

      if (!dreamDescription) {
        return res.status(400).json({ error: 'Rüya açıklaması gerekli' });
      }

      const interpretation = await OpenAIService.interpretDream(dreamDescription, dreamDate);
      res.json({ interpretation });
    } catch (error) {
      console.error('Rüya yorumu hatası:', error);
      res.status(500).json({ error: 'Rüya yorumlanırken bir hata oluştu' });
    }
  }

  async interpretCoffeeReading(req, res) {
    try {
      const { imageUrls } = req.body;

      if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
        return res.status(400).json({ error: 'En az bir fincan fotoğrafı gerekli' });
      }

      const interpretation = await OpenAIService.interpretCoffeeReading(imageUrls);
      res.json({ interpretation });
    } catch (error) {
      console.error('Kahve falı yorumu hatası:', error);
      res.status(500).json({ error: 'Kahve falı yorumlanırken bir hata oluştu' });
    }
  }
}

module.exports = new InterpretationController(); 
