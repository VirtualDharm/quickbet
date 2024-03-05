// routes/bet.js

const express = require('express');
const router = express.Router();
const betController = require('../controllers/betController');

// Create a bet
router.post('/createBet', betController.createBet);

// Retrieve all bets
router.get('/getAllBets', betController.getAllBets);

module.exports = router;