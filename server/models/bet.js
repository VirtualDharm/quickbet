// models/bet.js
const mongoose = require("mongoose");

const betSchema = new mongoose.Schema({
  username: String,
  betId: String,
  betTime: { type: Date, default: Date.now },
  betValue: Number,
  target: Number,
  result: Number,
  profitLoss: Number,
});

module.exports = mongoose.model("Bet", betSchema);
