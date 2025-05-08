const express = require('express');
const router = express.Router();
const { createSeller, getSellerById, getAllSellers } = require('../controllers/seller');

// Route to create a seller
router.post('/', createSeller);

// Route to get a seller by ID
router.get('/:id', getSellerById);

// Route to get all sellers
router.get('/', getAllSellers);

module.exports = router;
