const express = require('express');
const { getPublicNotices, getNotices, createNotice, updateNotice, deleteNotice } = require('../Controllers/NoticeController');
const adminAuth = require('../Middleware/AdminAuth');

const router = express.Router();

router.get('/public', getPublicNotices);          // public — no auth
router.get('/',       adminAuth, getNotices);
router.post('/',      adminAuth, createNotice);
router.put('/:id',    adminAuth, updateNotice);
router.delete('/:id', adminAuth, deleteNotice);

module.exports = router;
