import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://fauzibelajar96:Xy8f9c3ndZxhoEDG@cluster0.yhoaec3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);
  }
};
