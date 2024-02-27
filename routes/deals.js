const express = require('express');
const dealsController = require('../controllers/deals');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// post
router.post('/', authMiddleware.verifyToken, dealsController.createDeals);


//GET
router.get('/', authMiddleware.verifyToken, dealsController.getDeals);


router.patch('/', authMiddleware.verifyToken, dealsController.updateDeals);

module.exports = router;