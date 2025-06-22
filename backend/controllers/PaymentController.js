const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { StripeService } = require('../services/StripeService');
const { OpenAIService } = require('../services/OpenAIService');

class PaymentController {
  constructor() {
    this.stripeService = new StripeService();
    this.openAIService = new OpenAIService();
  }

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

        let interpretation = '';

        // Yorumu al
        if (metadata.type === 'dream') {
          interpretation = await this.openAIService.interpretDream({
            dreamDescription: metadata.dreamDescription,
            dreamDate: metadata.dreamDate
          });
        } else if (metadata.type === 'coffee') {
          interpretation = await this.openAIService.interpretCoffee({
            images: metadata.images
          });
        }

        // E-posta gönder
        await this.sendEmail({
          to: session.customer_email,
          name: session.customer_name,
          type: metadata.type,
          interpretation
        });

        // WhatsApp mesajı gönder
        if (metadata.phone) {
          await this.sendWhatsAppMessage({
            phone: metadata.phone,
            name: session.customer_name,
            type: metadata.type,
            interpretation
          });
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

  async createSession(req, res) {
    try {
      const { productId, customerEmail, customerName, metadata } = req.body;

      // Stripe session oluştur
      const session = await this.stripeService.createSession({
        productId,
        customerEmail,
        customerName,
        metadata
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error('Payment session creation error:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async sendEmail({ to, name, type, interpretation }) {
    // EmailJS entegrasyonu burada yapılacak
    // Şimdilik console.log ile gösterelim
    console.log(`E-posta gönderildi:
      Alıcı: ${to}
      İsim: ${name}
      Tip: ${type}
      Yorum: ${interpretation}
    `);
  }

  async sendWhatsAppMessage({ phone, name, type, interpretation }) {
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
