import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_ATLAS_URI;
    if (!MONGODB_URI) {
      throw new Error("MongoDB URI is not defined in .env file");
    }
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB...", error);
  }
};

export default connectDB;
