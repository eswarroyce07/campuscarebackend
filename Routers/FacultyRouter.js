const express = require('express');
const { getFaculty, createFaculty, updateFaculty, deleteFaculty } = require('../Controllers/FacultyController');
const adminAuth = require('../Middleware/AdminAuth');

const router = express.Router();

router.get('/',       adminAuth, getFaculty);
router.post('/',      adminAuth, createFaculty);
router.put('/:id',    adminAuth, updateFaculty);
router.delete('/:id', adminAuth, deleteFaculty);

module.exports = router;
