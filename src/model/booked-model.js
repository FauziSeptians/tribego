import mongoose from "mongoose";

const bookedSchemas = mongoose.Schema({
  destinationId: {
    type: mongoose.Schema.ObjectId,
    ref: "Destination",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    require: true,
  },
  destinationName: {
    type: String,
  },
  guest: {
    type: Number,
    min: 1,
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
