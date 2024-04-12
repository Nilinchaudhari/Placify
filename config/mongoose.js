require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');

// Set strictQuery to true
mongoose.set('strictQuery', true);

// Connect to the MongoDB database using the URI from environment variables
mongoose.connect(process.env.DB_URL, {
  
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error connection to DB"));

db.once('open', function() {
  console.log("Connected to MongoDB database:", process.env.DB_NAME);
});

module.exports = db;
