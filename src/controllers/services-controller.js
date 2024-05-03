import { ResponseModel } from "../model/response-model.js";
import { ServicesService } from "../services/service-services.js";
import { ResponseError } from "../error/errors.js";

export class servicesController {
  static async create(req, res, next) {
    try {
      if (!req.is("multipart/form-data")) {
        throw new ResponseError(400, "Invalid form data type");
      }

      // console.log(req);
      const images = req.file;
      const data = req.body.data;

      // console.log(images);

      const datas = await ServicesService.create(images.filename, data);

      return datas;
    } catch (err) {
      next(err);
    }
  }

  static async getServices(req, res, next) {
    try {
      const data = await ServicesService.getServices();
      return data;
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      if (!req.is("multipart/form-data")) {
        throw new ResponseError(400, "Invalid form data type");
      }

      const images = req?.file;
      const data = req.body.data;

      await ServicesService.update(images?.filename, data, req.params.id);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully updated data gallery"));
    } catch (error) {
      next(error);
    }
  }

  static async deleteServices(req, res, next) {
    try {
      await ServicesService.deleteServices(req.params.id);
      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully deleted data gallery"));
    } catch (error) {
      next(error);
    }
  }
}
