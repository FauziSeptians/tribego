import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  Images: {
    type: String,
    require: true,
  },
  Title: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
});

export const ServicesModel = mongoose.model("Services", serviceSchema);
