const express = require('express');
const router = express.Router();
const { 
  createProfessional 
} = require('../controllers/professional');

router.post('/', createProfessional);

module.exports = router;