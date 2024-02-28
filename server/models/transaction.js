// models/transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Reference to User model
  betNo: { type: Number, required: true },
  betAmount: { type: Number, required: true },
  result: { type: String, enum: ['win', 'lose'], required: true },
  profitLoss: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('transaction', transactionSchema);
