const express = require('express');
const router = express.Router();
const { 
  createStudent, 
  getStudents 
} = require('../controllers/student');

router.post('/', createStudent);
router.get('/', getStudents);

module.exports = router;