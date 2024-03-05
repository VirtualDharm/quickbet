// routes/poolSize.js
const express = require('express');
const router = express.Router();
const poolSizeController = require('../controllers/poolSizeController');

// Create a pool size
router.post('/', poolSizeController.createPoolSize);

// Retrieve all pool sizes
router.get('/getCurrentPoolSize', poolSizeController.getPoolSizeByStartTime);

module.exports = router;