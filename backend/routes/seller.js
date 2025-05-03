const express = require('express');
const router = express.Router();
const { createSeller } = require('../controllers/seller');

router.post('/', createSeller);

module.exports = router;