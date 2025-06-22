const express = require('express');
const router = express.Router();
const InterpretationController = require('../controllers/InterpretationController');

router.post('/dream', InterpretationController.interpretDream);
router.post('/coffee', InterpretationController.interpretCoffeeReading);

module.exports = router; 
