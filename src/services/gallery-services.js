import { ResponseError } from "../error/errors.js";
import { GalleryModel } from "../model/gallery-model.js";
import fs from "fs";

export class GalleryServices {
  static async create(requestBody) {
    const images = requestBody;
    await GalleryModel.create({
      images: images,
    });

    return;
  }

  static async getGallery() {
    const dataUsers = await GalleryModel.find({});
    return dataUsers;
  }

  static async update(requestBody, id) {
    const images = requestBody;

    if (!id) {
      throw new ResponseError(404, "Please insert id first");
    }

    const isDataExists = await GalleryModel.find({
      _id: id,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(404, "Data not found");
    }

    const Data = await GalleryModel.findOne({
      _id: id,
    });

    const removeFilePath = "public/uploads/" + Data.images;

    await fs.promises.unlink(removeFilePath);

    await GalleryModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        images: images,
      }
    );
  }

  static async deleteGallery(id) {
    if (!id) {
      throw new ResponseError(404, "Please insert id first");
    }

    const isDataExists = await GalleryModel.find({
      _id: id,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(404, "Data not found");
    }

    const Data = await GalleryModel.findOne({
      _id: id,
    });

    console.log(Data);
    console.log(Data.images);

    const filePath = "public/uploads/" + Data.images;

    await fs.promises.unlink(filePath);

    await GalleryModel.deleteOne({ _id: id });
  }
}
