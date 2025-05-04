const express = require('express');
const router = express.Router();
const { 
  createStudent, 
  getStudents, 
  getStudentById
} = require('../controllers/student');

router.post('/', createStudent);
router.get('/', getStudents);
router.get('/:id', getStudentById);

module.exports = router;