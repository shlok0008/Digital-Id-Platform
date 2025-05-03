const express = require('express');
const router = express.Router();
const { createBioData } = require('../controllers/bioData');

router.post('/', createBioData);

module.exports = router;