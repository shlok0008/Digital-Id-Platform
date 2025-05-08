const express = require('express');
const router = express.Router();
const { createBioData, getAllBioData, getBioDataById } = require('../controllers/bioData');

router.post('/', createBioData);  //👈 Post Request
router.get('/', getAllBioData); // 👈 Get Request
router.get('/:id', getBioDataById);

module.exports = router;