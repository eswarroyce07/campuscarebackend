const express = require('express');
const { getStudents, createStudent, updateStudent, deleteStudent } = require('../Controllers/StudentController');
const adminAuth = require('../Middleware/AdminAuth');

const router = express.Router();

router.get('/',     adminAuth, getStudents);
router.post('/',    adminAuth, createStudent);
router.put('/:id',  adminAuth, updateStudent);
router.delete('/:id', adminAuth, deleteStudent);

module.exports = router;
