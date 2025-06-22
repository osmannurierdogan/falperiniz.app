const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes
const paymentRoutes = require('./routes/payment');
const interpretationRoutes = require('./routes/interpretation');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/interpretations', interpretationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app; 
