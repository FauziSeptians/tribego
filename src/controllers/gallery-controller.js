import { ResponseModel } from "../model/response-model.js";
import { GalleryServices } from "../services/gallery-services.js";

export class galleryController {
  static async create(req, res, next) {
    try {
      const file = req.file;
      await GalleryServices.create(file.filename);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully created gallery"));
    } catch (err) {
      next(err);
    }
  }

  static async getGallery(req, res, next) {
    try {
      const data = await GalleryServices.getGallery();
      return data;
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const file = req.file;
      // console.log(file);
      await GalleryServices.update(file.filename, req.params.id);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully updated data gallery"));
    } catch (error) {
      next(error);
    }
  }

  static async deleteGallery(req, res, next) {
    try {
      await GalleryServices.deleteGallery(req.params.id);
      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully deleted data gallery"));
    } catch (error) {
      next(error);
    }
  }
}
