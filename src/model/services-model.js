import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  Images: {
    type: string,
    require: true,
  },
  Title: {
    type: string,
    require: true,
  },
  Description: {
    type: string,
    require: true,
  },
});

export const ServicesModel = mongoose.model("Services", serviceSchema);
