const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

// Webhook için özel middleware
const webhookMiddleware = express.raw({ type: 'application/json' });

// Ödeme işlemleri
router.post('/create-checkout-session', PaymentController.createCheckoutSession);
router.post('/webhook', webhookMiddleware, PaymentController.handleWebhook);
router.get('/success', PaymentController.handleSuccess);

module.exports = router; 
