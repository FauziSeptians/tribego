import { ResponseModel } from "../model/response-model.js";
import { BookServices } from "../services/book-services.js";

export class bookController {
  static async create(req, res, next) {
    try {
      await BookServices.create(req.body);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully created book data"));
    } catch (err) {
      next(err);
    }
  }

  static async getBook(req, res, next) {
    try {
      const data = await BookServices.getBook();
      return data;
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      await BookServices.update(req.body, req.params.id);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully updated data user"));
    } catch (error) {
      next(error);
    }
  }

  static async getBookByIdUser(req, res, next) {
    try {
      const data = await BookServices.getBookByIdUser(req.params.id);
      return data;
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      // console.log(req.params.id);
      await BookServices.deleteBook(req.params.id);
      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully deleted data user"));
    } catch (error) {
      next(error);
    }
  }
}
