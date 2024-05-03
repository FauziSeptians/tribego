import { ResponseModel } from "../model/response-model.js";
import { ReviewServices } from "../services/review-services.js";

export class reviewController {
  static async create(req, res, next) {
    try {
      await ReviewServices.create(req.body);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully created review"));
    } catch (err) {
      next(err);
    }
  }

  static async getReviews(req, res, next) {
  
      const data = await ReviewServices.getReviews();
      return data;
    
  }

  static async update(req, res, next) {
    try {
      await ReviewServices.update(req.body, req.params.id);

      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully updated data user"));
    } catch (error) {
      next(error);
    }
  }

  static async deleteReview(req, res, next) {
    try {
      // console.log(req.params.id);
      await ReviewServices.deleteReview(req.params.id);
      return res
        .status(200)
        .send(new ResponseModel({}, "Successfully deleted data user"));
    } catch (error) {
      next(error);
    }
  }
}
