import mongoose from "mongoose";

const destinationSchemas = mongoose.Schema({
  Title: {
    type: String,
    require: true,
  },
  Location: {
    type: String,
    require: true,
  },
  Images: {
    type: String,
  },
  Description: {
    type: String,
    require: true,
  },
  Price: {
    type: Number,
    require: true,
  },
  Promo: {
    type: Number,
    require: true,
  },
});

export const DestinationModel = mongoose.model(
  "Destination",
  destinationSchemas
);
