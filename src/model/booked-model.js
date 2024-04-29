import { type } from "express/lib/response";
import mongoose from "mongoose";

const bookedSchemas = mongoose.Schema({
  destinationId: {
    type: mongoose.Schema.ObjectId,
    ref: "Destination",
    require: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    require: true,
  },
  guest: {
    type: Number,
    require: true,
  },
  startBook: {
    type: Date,
    require: true,
  },
  endBook: {
    type: Date,
    require: true,
  },
});

export const BookedModel = mongoose.model("Booked", bookedSchemas);
