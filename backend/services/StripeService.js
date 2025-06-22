const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripeService {
  constructor() {
    this.stripe = stripe;
  }

  async createSession({ productId, customerEmail, customerName, metadata }) {
    try {
      // Ürün bilgilerini al
      const product = await this.getProduct(productId);

      // Checkout session oluştur
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'try',
              product_data: {
                name: product.name,
                description: product.description
              },
              unit_amount: product.amount // Kuruş cinsinden
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
        customer_email: customerEmail,
        metadata: {
          ...metadata,
          customerName
        }
      });

      return session;
    } catch (error) {
      console.error('Stripe session creation error:', error);
      throw new Error('Ödeme oturumu oluşturulurken bir hata oluştu');
    }
  }

  async getProduct(productId) {
    // Ürün bilgileri
    const products = {
      dream: {
        name: 'Rüya Yorumu',
        description: 'Profesyonel rüya yorumu hizmeti',
        amount: 4999 // 49.99 TL
      },
      coffee: {
        name: 'Kahve Falı',
        description: 'Profesyonel kahve falı bakımı',
        amount: 7999 // 79.99 TL
      }
    };

    const product = products[productId];
    if (!product) {
      throw new Error('Geçersiz ürün ID\'si');
    }

    return product;
  }

  async createCheckoutSession({
    items,
    customerInfo,
    successUrl,
    cancelUrl
  }) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => ({
          price_data: {
            currency: 'try',
            product_data: {
              name: item.name,
              description: item.description,
            },
            unit_amount: Math.round(item.amount * 100),
          },
          quantity: 1,
        })),
        customer_email: customerInfo.email,
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone || '',
          items: JSON.stringify(items),
        },
      });

      return {
        sessionId: session.id,
        sessionUrl: session.url,
      };
    } catch (error) {
      console.error('Stripe checkout session oluşturma hatası:', error);
      throw new Error('Ödeme sayfası oluşturulurken bir hata oluştu');
    }
  }

  async constructWebhookEvent(payload, signature) {
    try {
      return stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (error) {
      console.error('Stripe webhook event oluşturma hatası:', error);
      throw new Error('Webhook event\'i doğrulanamadı');
    }
  }

  async retrieveSession(sessionId) {
    try {
      return await stripe.checkout.sessions.retrieve(sessionId);
    } catch (error) {
      console.error('Stripe session getirme hatası:', error);
      throw new Error('Ödeme bilgisi alınırken bir hata oluştu');
    }
  }
}

module.exports = { StripeService }; 
