const mongoose = require('mongoose');

require('dotenv').config();
async function connectToDatabase() {
  try {
    const databaseUrl = process.env.url;
    await mongoose.connect("mongodb+srv://.mongodb.net/logindatabase");
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
