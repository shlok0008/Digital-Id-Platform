const express = require('express');
const router = express.Router();
const { 
  createProfessional,
  getAllProfessionals,
  getProfessionalById
} = require('../controllers/professional');

router.post('/', createProfessional);
router.get('/', getAllProfessionals);
router.get('/:id', getProfessionalById);

module.exports = router;