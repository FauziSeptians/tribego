import { type } from "express/lib/response";
import mongoose, { mongo } from "mongoose";

const destinationSchemas = mongoose.Schema({
  Title: {
    type: string,
    require: true,
  },
  Location: {
    type: string,
    require: true,
  },
  Description: {
    type: string,
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

export const DestinationModel = mongoose.model("Destination", destinationSchemas);
