// routes/game.js
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/spin', gameController.spinWheel);

module.exports = router;
