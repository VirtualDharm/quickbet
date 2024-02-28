const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
// const gameRoutes = require('./routes/game');

// Import models
// const User = require('./models/User');
// const RouletteGame = require('./models/RouletteGame');
// const GameHistory = require('./models/GameHistory');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
// app.use('/game', gameRoutes);

// MongoDB Connection
const uri = 'mongodb+srv://lama:lama@cluster0.fsrfj2t.mongodb.net/quickbet?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Welcome to QuickBet!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
