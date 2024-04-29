import mongoose from "mongoose";

const reviewSchemas = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  destinationId: {
    type: mongoose.Schema.ObjectId,
    ref: "Destination",
    required: true,
  },
  starReview: {
    type: Number,
    require: true,
  },
  Description: {
    type: String,
  },
});

export const ReviewModel = mongoose.model("Review", reviewSchemas)
