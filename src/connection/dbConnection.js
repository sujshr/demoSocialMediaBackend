const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_ATLAS_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB...", error);
    process.exit(1);
  }
};

module.exports = connectDB;
