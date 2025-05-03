const express = require('express');
const router = express.Router();
const { createBuyerCard } = require('../controllers/buyerCard');

router.post('/', createBuyerCard);

module.exports = router;