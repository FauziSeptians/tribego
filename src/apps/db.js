import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("");
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);
  }
};
