require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = require('./app');

// Ödeme niyeti oluşturma endpoint'i
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe kuruş cinsinden çalışır
      currency: "try",
      payment_method_types: ["card"],
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Checkout session oluşturma endpoint'i
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, type, formData } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "try",
            product_data: {
              name: type === "coffee" ? "Kahve Falı" : "Rüya Yorumu",
              description:
                type === "coffee" ? "Kahve Falı Yorumu" : "Rüya Yorumu Hizmeti",
            },
            unit_amount: amount * 100, // Kuruş cinsinden
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/${type}`,
      metadata: {
        type,
        formData: JSON.stringify(formData),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session hatası:", error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint'i
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Ödeme başarılı olduğunda
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      console.log("Ödeme başarılı:", paymentIntent.id);
      // Burada veritabanına kayıt, e-posta gönderimi gibi işlemler yapılabilir
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const formData = JSON.parse(session.metadata.formData);
      const type = session.metadata.type;

      // Burada form verilerini işleyebilir, veritabanına kaydedebilir
      // ve e-posta gönderimi yapabilirsiniz
      console.log("Ödeme başarılı:", {
        type,
        formData,
        paymentIntent: session.payment_intent,
      });
    }

    res.json({ received: true });
  },
);

// Environment variables kontrolü
const requiredEnvVars = [
  // 'PORT',
  'STRIPE_SECRET_KEY',
  // 'STRIPE_WEBHOOK_SECRET',
  'FRONTEND_URL'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Error: Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});

