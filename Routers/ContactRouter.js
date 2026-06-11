const express = require('express');
const { submitContact, getContacts, resolveContact, deleteContact } = require('../Controllers/ContactController');
const adminAuth = require('../Middleware/AdminAuth');

const router = express.Router();

router.post('/',              submitContact);               // public — existing
router.get('/',               adminAuth, getContacts);      // admin
router.put('/:id/resolve',    adminAuth, resolveContact);   // admin
router.delete('/:id',         adminAuth, deleteContact);    // admin

module.exports = router;
