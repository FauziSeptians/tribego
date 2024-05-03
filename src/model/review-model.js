import mongoose from "mongoose";

const reviewSchemas = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  destinationName: {
    type: String,
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

export const ReviewModel = mongoose.model("Review", reviewSchemas);
