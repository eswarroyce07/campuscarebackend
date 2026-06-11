const express = require('express');
const { adminLogin, getDashboard } = require('../Controllers/AdminController');
const adminAuth = require('../Middleware/AdminAuth');

const router = express.Router();

router.post('/login', adminLogin);
router.get('/dashboard', adminAuth, getDashboard);

module.exports = router;
