const mongoose = require("mongoose");

// Main database connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

// Function to dynamically use a different database
const useDatabase = (dbName) => {
  return mongoose.connection.useDb(dbName);
};

module.exports = { connectDB, useDatabase };
