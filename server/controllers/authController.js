// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  const { userName, password } = req.body;

  try {

    let user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = new User({
      userName,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create and return a JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, 'jwtSecret', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  try {

    let user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and return a JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, 'jwtSecret', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.balance = async (req, res) => {
  try {
    const { userName } = req.query;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
