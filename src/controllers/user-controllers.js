import { verifyLogin } from "../middleware/auth-middleware.js";
import { ResponseModel } from "../model/response-model.js";
import { UserServices } from "../services/user-services.js";

export class userController {
  static async create(req, res, next) {
    try {
      await UserServices.create(req.body);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully created user"));
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const data = await UserServices.login(req.body);

      return res;
    } catch (err) {
      next(err);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const data = await UserServices.getUsers();
      return data;
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await UserServices.update(req.body, req.params.id);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully updated data user"));
    } catch (error) {
      next(error);
    }
  }

  static async deleteUsers(req, res, next) {
    try {
      // console.log(req.params.id);
      await UserServices.deleteUsers(req.params.id);
      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully deleted data user"));
    } catch (error) {
      next(error);
    }
  }

  static async isCheckLogin(req, res, next) {
    try {
      const data = await UserServices.isCheckLogin();
      return data;
    } catch (error) {
      next(error);
    }
  }
}
