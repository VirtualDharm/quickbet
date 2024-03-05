// controllers/poolSizeController.js
const PoolSize = require('../models/poolSize');

exports.createPoolSize = async (req, res) => {
  try {
    const poolSize = await PoolSize.create(req.body);
    res.status(201).json(poolSize);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPoolSize = async (req, res) => {
  try {
    const poolSizes = await PoolSize.find();
    res.json(poolSizes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPoolSizeByStartTime = async (req, res) => {
  try {
    const { starttime } = req.query;
    console.log(`startime at backend: `, starttime)
    const poolSize = await PoolSize.findOne({ startTime: starttime }); // Assuming starttime is stored as the hour
    if (!poolSize) {
      return res.status(404).json({ message: 'Pool size not found for the specified starttime' });
    }
    res.json({ poolSize });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Other CRUD operations can be added as needed
