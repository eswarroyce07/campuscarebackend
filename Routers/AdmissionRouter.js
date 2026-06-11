const express = require('express');
const { submitAdmission, getAdmissions, updateStatus, deleteAdmission } = require('../Controllers/AdmissionController');
const adminAuth = require('../Middleware/AdminAuth');

const router = express.Router();

router.post('/',           submitAdmission);               // public
router.get('/',            adminAuth, getAdmissions);      // admin
router.put('/:id/status',  adminAuth, updateStatus);       // admin
router.delete('/:id',      adminAuth, deleteAdmission);    // admin

module.exports = router;
