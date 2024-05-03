import { verifyLogin } from "../middleware/auth-middleware.js";
import { ResponseModel } from "../model/response-model.js";
import { ContactServices } from "../services/contact-services.js";

export class contactController {
  static async create(req, res, next) {
    try {
      await ContactServices.create(req.body);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully created user"));
    } catch (err) {
      next(err);
    }
  }

  static async getContact(req, res, next) {
    try {
      const data = await ContactServices.getContact();
      return data;
    } catch (error) {
      next(error);
    }
  }

  static async deleteContact(req, res, next) {
    try {
      // console.log(req.params.id);
      await ContactServices.delete(req.params.id);
      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully deleted data user"));
    } catch (error) {
      next(error);
    }
  }
}
