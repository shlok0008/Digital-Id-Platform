const express = require('express');
const router = express.Router();
const { createBuyerCard, getAllBuyerCards, getBuyerCardById } = require('../controllers/buyerCard');

// Routes for buyer cards
router.post('/', createBuyerCard);
router.get('/', getAllBuyerCards);  // New route to get all buyer cards
router.get('/:id', getBuyerCardById); // Existing route to get buyer card by ID

module.exports = router;