require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./interfaces/http/routes/auth");
const fortuneRoutes = require("./interfaces/http/routes/fortune");
const dreamRoutes = require("./interfaces/http/routes/dream");
const paymentRoutes = require("./interfaces/http/routes/payment");

// Environment variables kontrolü
const requiredEnvVars = [
  'MONGODB_URI', 
  'JWT_SECRET', 
  'PORT',
  'STRIPE_SECRET_KEY',
  // 'STRIPE_WEBHOOK_SECRET'
];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Error: Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

const app = express();

// CORS yapılandırması
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://app.falperiniz.com' 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Body parser
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payments/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/fortunes", fortuneRoutes);
app.use("/api/dreams", dreamRoutes);
app.use("/api/payments", paymentRoutes);

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => {
    console.error("MongoDB bağlantı hatası:", err);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Sunucu hatası',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Sayfa bulunamadı' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});

