// controllers/gameController.js
const Transaction = require('../models/transaction');

exports.spinWheel = async (req, res) => {
  const { betNo, betAmount } = req.body;
  const randomNumber = Math.floor(Math.random() * 31);

  let result, profitLoss;
  if (betNo === randomNumber) {
    result = 'win';
    profitLoss = betAmount;
  } else {
    result = 'lose';
    profitLoss = -betAmount;
  }

  // Save transaction to the database
  const transaction = new Transaction({
    user: req.user.id,
    betNo,
    betAmount,
    result,
    profitLoss,
  });

  try {
    await transaction.save();
    res.json({ randomNumber, result, profitLoss });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
