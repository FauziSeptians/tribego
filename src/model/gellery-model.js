import mongoose from "mongoose";

const gallerySchemas = mongoose.Schema({
  images: {
    type: String,
    require: true,
  },
});

export const GalleryModel = mongoose.model("Gallery", gallerySchemas);
