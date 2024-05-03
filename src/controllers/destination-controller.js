import { ResponseError } from "../error/errors.js";
import { ResponseModel } from "../model/response-model.js";
import { DestinationServices } from "../services/destination-services.js";

export class destinationController {
  static async create(req, res, next) {
    try {
      if (!req.is("multipart/form-data")) {
        throw new ResponseError(400, "Invalid form data type");
      }

      // console.log(req);

      const file = req.file;
      const data = req.body.data;

      await DestinationServices.create(file.filename, data);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully created destination"));
    } catch (err) {
      next(err);
    }
  }

  static async getDestination(req, res, next) {
    try {
      const data = await DestinationServices.getDestination();
      return data;
    } catch (err) {
      next(err);
    }
  }

  static async getDestinationById(req, res, next) {
    try {
      const id = req.params.id;
      const data = await DestinationServices.getDestinationById(id);
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

      const file = req?.file;
      const data = req.body.data;
      // console.log(file);

      await DestinationServices.update(file?.filename, data, req.params.id);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully updated data user"));
    } catch (error) {
      next(error);
    }
  }

  static async deleteDestination(req, res, next) {
    try {
      // console.log(req.params.id);
      await DestinationServices.deleteDestination(req.params.id);
      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully deleted data user"));
    } catch (error) {
      next(error);
    }
  }
}
