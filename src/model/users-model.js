import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  token: { type: String },
});

export const UserModel = mongoose.model("Users", userSchema);
