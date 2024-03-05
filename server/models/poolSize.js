// models/poolSize.js
const mongoose = require("mongoose");

const poolSizeSchema = new mongoose.Schema({
  startTime: Number,
  endTime: Number,
  availableSize: Number,
});

module.exports = mongoose.model("PoolSize", poolSizeSchema);
