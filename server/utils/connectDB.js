import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbURL =
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URL_ATLAS
        : process.env.MONGODB_URL_LOCAL;

    await mongoose.connect(dbURL);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;