// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const betRoutes = require('./routes/bet');
const poolSizeRoutes = require('./routes/poolSize');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/bets', betRoutes);
app.use('/pool_sizes', poolSizeRoutes); // Use the new route file

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
