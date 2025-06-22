const OpenAI = require('openai');

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async interpretDream(dreamDescription, dreamDate) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: `Sen profesyonel bir rüya yorumcususun. Verilen rüyayı detaylı bir şekilde analiz et ve şu başlıklar altında yorumla:
            1. Rüyanın Genel Analizi
            2. Rüyadaki Önemli Semboller ve Anlamları
            3. Rüyanın Psikolojik Boyutu
            4. Gelecekle İlgili İşaretler
            5. Tavsiyeler

            Yorumunu yaparken:
            - Bilimsel ve spiritüel yaklaşımları dengele
            - Pozitif bir ton kullan ama gerçekçi ol
            - Kültürel bağlamı (Türk kültürü) göz önünde bulundur
            - Rüya tarihini de değerlendirmene kat
            - Gereksiz bilgileri kullanıcıya gösterme
            - Kullanıcıya yorumu daha anlaşılır hale getir`
          },
          {
            role: "user",
            content: `Rüya Tarihi: ${dreamDate}\n\nRüya Açıklaması: ${dreamDescription}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Rüya yorumu hatası:', error);
      throw new Error('Rüya yorumlanırken bir hata oluştu');
    }
  }

  async interpretCoffeeReading(imageUrls) {
    try {
      // Birden fazla fotoğraf için tüm yorumları birleştireceğiz
      const interpretations = await Promise.all(imageUrls.map(async (imageUrl, index) => {
        try {
          // Base64 formatını kontrol et ve düzenle
          let formattedImageUrl = imageUrl;
          if (imageUrl.startsWith('data:image/')) {
            // Base64 formatını olduğu gibi kullan
            formattedImageUrl = imageUrl;
          }

          const completion = await this.openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
              {
                role: "system",
                content: `Sen deneyimli bir kahve falı yorumcususun. Gönderilen fincan fotoğrafını detaylı bir şekilde analiz et ve şu başlıklar altında yorumla:
                1. Genel Görünüm ve İlk İzlenimler
                2. Öne Çıkan Semboller ve Anlamları
                3. Fincanın Bölgesel Analizi (Ağız, Orta, Dip)
                4. Yakın Gelecek İşaretleri
                5. Uzak Gelecek İşaretleri
                6. Aşk ve İlişkiler
                7. Kariyer ve İş Hayatı
                8. Sağlık ve Genel Durum

                Yorumunu yaparken:
                - Türk kahve falı geleneğine uygun yorumla
                - Pozitif mesajlara öncelik ver ama gerçekçi ol
                - Net gördüğün sembollere odaklan
                - Belirsiz şekilleri zorlamadan yorumla
                - Kültürel bağlamı koru`
              },
              {
                role: "user",
                content: [
                  {
                    type: "image",
                    image_url: formattedImageUrl
                  },
                  {
                    type: "text",
                    text: "Bu fincan fotoğrafını Türk kahve falı geleneğine göre yorumlar mısın?"
                  }
                ]
              }
            ],
            max_tokens: 2000,
            temperature: 0.7
          });

          return completion.choices[0].message.content;
        } catch (error) {
          console.error(`Fincan ${index + 1} yorumu hatası:`, error);
          throw new Error(`Fincan ${index + 1} yorumlanırken bir hata oluştu: ${error.message}`);
        }
      }));

      // Tüm yorumları birleştir
      return interpretations.join('\n\n--- Diğer Fincan ---\n\n');
    } catch (error) {
      console.error('Kahve falı yorumu hatası:', error);
      throw new Error('Kahve falı yorumlanırken bir hata oluştu: ' + error.message);
    }
  }
}

module.exports = new OpenAIService(); 
