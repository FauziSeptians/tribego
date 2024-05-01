import { ResponseError } from "../error/errors.js";
import { ServicesModel } from "../model/services-model.js";
import fs from "fs";

export class ServicesService {
  static async create(images, requestBody) {
    const newData = JSON.parse(requestBody);
    const { title, description } = newData;
    const Images = images;

    if (!title || !description || !images) {
      throw new ResponseError(400, "Data must be filled");
    }

    await ServicesModel.create({
      Images: Images,
      Title: title,
      Description: description,
    });

    return;
  }

  static async getServices() {
    const data = await ServicesModel.find({});
    return data;
  }

  static async update(images, data, id) {
    const Images = images;
    const newData = JSON.parse(data);

    const { title, description } = newData;

    if (!id) {
      throw new ResponseError(404, "Please insert id first");
    }

    if (!title || !description) {
      throw new ResponseError(404, "Data must be filled");
    }

    const isDataExists = await ServicesModel.find({
      _id: id,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(404, "Data not found");
    }

    const Data = await ServicesModel.findOne({
      _id: id,
    });

    if (Images) {
      const removeFilePath = "public/uploads/" + Data.Images;

      await fs.promises.unlink(removeFilePath);
    }

    await ServicesModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        Title: title,
        Description: description,
        Images: Images,
      }
    );
  }

  static async deleteServices(id) {
    if (!id) {
      throw new ResponseError(404, "Please insert id first");
    }

    const isDataExists = await ServicesModel.find({
      _id: id,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(404, "Data not found");
    }

    const Data = await ServicesModel.findOne({
      _id: id,
    });

    const filePath = "public/uploads/" + Data.Images;

    await fs.promises.unlink(filePath);

    await ServicesModel.deleteOne({ _id: id });
  }
}
