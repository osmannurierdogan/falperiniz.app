const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { StripeService } = require('../services/StripeService');
const openAIService = require('../services/OpenAIService');
const nodemailer = require('nodemailer');

class PaymentController {
  static stripeService = new StripeService();

  // E-posta göndermek için transporter oluştur
  static transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Checkout session oluşturma
  static async createCheckoutSession(req, res) {
    try {
      const { items, customerInfo } = req.body;
      
      // Müşteri bilgilerini kontrol et
      let validCustomerInfo = customerInfo;
      if (!validCustomerInfo || !validCustomerInfo.email) {
        validCustomerInfo = {
          name: 'Misafir',
          email: 'guest@falperiniz.com',
          phone: ''
        };
      }
      
      // Stripe session oluştur
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => ({
          price_data: {
            currency: 'try',
            product_data: {
              name: item.name,
              description: item.description,
            },
            unit_amount: item.amount * 100, // Kuruş cinsinden
          },
          quantity: 1,
        })),
        customer_email: validCustomerInfo.email,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
        metadata: {
          customerName: validCustomerInfo.name,
          customerEmail: validCustomerInfo.email,
          customerPhone: validCustomerInfo.phone || '',
          items: JSON.stringify(items),
        },
      });

      console.log('Checkout session created:', session.id);
      res.json({ url: session.url });
    } catch (error) {
      console.error('Checkout session error:', error);
      res.status(500).json({ message: 'Ödeme başlatılırken bir hata oluştu' });
    }
  }

  // Webhook handler
  static async handleWebhook(req, res) {
    try {
      const sig = req.headers['stripe-signature'];
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const metadata = session.metadata;

        // Sadece rüya yorumu için OpenAI'dan yorum al ve e-posta gönder
        if (metadata.type === 'dream') {
          try {
            // OpenAI'dan rüya yorumu al
            const interpretation = await openAIService.interpretDream(
              metadata.dreamDescription,
              metadata.dreamDate
            );

            // E-posta gönder
            await this.sendEmail({
              to: metadata.customerEmail,
              name: metadata.customerName,
              interpretation
            });

            console.log('Rüya yorumu e-posta ile gönderildi:', metadata.customerEmail);
          } catch (error) {
            console.error('Rüya yorumu veya e-posta gönderme hatası:', error);
          }
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).json({ message: error.message });
    }
  }

  // Başarılı ödeme handler
  static async handleSuccess(req, res) {
    try {
      const { session_id } = req.query;
      
      // Session'ı kontrol et
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (!session) {
        return res.status(404).json({ message: 'Ödeme bulunamadı' });
      }

      res.json({ success: true, session });
    } catch (error) {
      console.error('Success handler error:', error);
      res.status(500).json({ message: 'Ödeme bilgileri alınırken bir hata oluştu' });
    }
  }

  static async createSession(req, res) {
    try {
      const { productId, customerEmail, customerName, metadata, images } = req.body;

      // Ödeme tutarını kontrol et
      const amount = metadata.amount || (metadata.type === 'coffee' ? 299.99 : 49.99);
      const unitAmount = Math.round(amount * 100); // TL'yi kuruşa çeviriyoruz

      // Stripe session oluştur
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'try',
            product_data: {
              name: metadata.type === 'coffee' ? 'Kahve Falı' : 'Rüya Yorumu',
              description: metadata.type === 'coffee' ? 'Kahve Falı Yorumu' : 'Rüya Yorumu Hizmeti',
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        }],
        customer_email: customerEmail,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
        metadata: {
          customerName,
          customerEmail,
          type: metadata.type,
          amount: amount.toString(), // Sayısal değerleri string'e çevir
          phone: metadata.phone || '',
          imageCount: images ? images.length.toString() : '0' // Görüntü sayısını metadata'da sakla
        },
      });

      // Görüntüleri geçici olarak sakla veya işle
      if (images && images.length > 0) {
        // TODO: Görüntüleri işle veya sakla
        console.log(`${images.length} adet görüntü alındı`);
      }

      res.json({ url: session.url });
    } catch (error) {
      console.error('Payment session creation error:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async sendEmail({ to, name, interpretation }) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Rüya Yorumunuz Hazır! - Fal Periniz',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Merhaba ${name},</h2>
          <p>Rüya yorumunuz hazır! İşte detaylar:</p>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            ${interpretation.split('\n').map(line => `<p>${line}</p>`).join('')}
          </div>
          <p>Saygılarımızla,<br>Fal Periniz Ekibi</p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('E-posta başarıyla gönderildi');
    } catch (error) {
      console.error('E-posta gönderme hatası:', error);
      throw new Error('E-posta gönderilirken bir hata oluştu');
    }
  }

  static async sendWhatsAppMessage({ phone, name, type, interpretation }) {
    // WhatsApp API entegrasyonu burada yapılacak
    // Şimdilik console.log ile gösterelim
    console.log(`WhatsApp mesajı gönderildi:
      Telefon: ${phone}
      İsim: ${name}
      Tip: ${type}
      Yorum: ${interpretation}
    `);
  }
}

module.exports = PaymentController; 
