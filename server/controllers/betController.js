// controllers/betController.js
const Bet = require('../models/bet');

exports.createBet = async (req, res) => {
  try {
    const bet = await Bet.create(req.body);
    res.status(201).json(bet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllBets = async (req, res) => {
  try {
    const bets = await Bet.find();
    res.json(bets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Other CRUD operations can be added as needed
