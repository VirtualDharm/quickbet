// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  balance: { type: Number, default: 1000 },
});

module.exports = mongoose.model('user', userSchema);
