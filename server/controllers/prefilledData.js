// prefilledData.js

const mongoose = require('mongoose');
const PoolSize = require('../models/poolSize');

// MongoDB Connection
const uri = 'mongodb+srv://lama:lama@cluster0.fsrfj2t.mongodb.net/quickbet?retryWrites=true&w=majority&appName=Cluster0'; 

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  // Define prefilled data
  const prefilledData = [
  { startTime: 0, endTime: 1, availableSize: 1000 },
  { startTime: 1, endTime: 2, availableSize: 2000 },
  { startTime: 2, endTime: 3, availableSize: 3000 },
  { startTime: 3, endTime: 4, availableSize: 4000 },
  { startTime: 4, endTime: 5, availableSize: 5000 },
  { startTime: 5, endTime: 6, availableSize: 6000 },
  { startTime: 6, endTime: 7, availableSize: 7000 },
  { startTime: 7, endTime: 8, availableSize: 8000 },
  { startTime: 8, endTime: 9, availableSize: 9000 },
  { startTime: 9, endTime: 10, availableSize: 10000 },
  { startTime: 10, endTime: 11, availableSize: 11000 },
  { startTime: 11, endTime: 12, availableSize: 12000 },
  { startTime: 12, endTime: 13, availableSize: 13000 },
  { startTime: 13, endTime: 14, availableSize: 14000 },
  { startTime: 14, endTime: 15, availableSize: 15000 },
  { startTime: 15, endTime: 16, availableSize: 16000 },
  { startTime: 16, endTime: 17, availableSize: 17000 },
  { startTime: 17, endTime: 18, availableSize: 18000 },
  { startTime: 18, endTime: 19, availableSize: 19000 },
  { startTime: 19, endTime: 20, availableSize: 20000 },
  { startTime: 20, endTime: 21, availableSize: 21000 },
  { startTime: 21, endTime: 22, availableSize: 22000 },
  { startTime: 22, endTime: 23, availableSize: 23000 },
  { startTime: 23, endTime: 24, availableSize: 24000 }
];


  // Insert prefilled data into the database
  await PoolSize.insertMany(prefilledData);
  console.log('Prefilled data inserted successfully');

  // Close the MongoDB connection
  mongoose.connection.close();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
