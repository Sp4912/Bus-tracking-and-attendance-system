// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/adminController');

// Login endpoint
router.post('/login', loginAdmin);

module.exports = router;