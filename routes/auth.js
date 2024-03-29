// authRoutes.js
const express = require('express');
const authController = require('../controllers/auth');
// const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshAccessToken);

module.exports = router;
