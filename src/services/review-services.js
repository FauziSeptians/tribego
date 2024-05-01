import { ResponseError } from "../error/errors.js";
import hashPassword from "../utils/hashPassword.js";
import { ReviewModel } from "../model/review-model.js";
import CompareHashPassword from "../utils/compareHashPassword.js";
import { DestinationModel } from "../model/destination-model.js";
import { UserModel } from "../model/users-model.js";

export class ReviewServices {
  static async create(requestBody) {
    const { userId, destinationId, startPoint, Description } = requestBody;
    console.log(requestBody);
    if (!userId || !destinationId || !startPoint || !Description) {
      throw new ResponseError(400, "Data must be filled");
    }

    const isDataExists = await UserModel.find({
      _id: userId,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(400, "userId not found");
    }

    const isDestinationExists = await DestinationModel.find({
      _id: destinationId,
    }).countDocuments();

    if (isDestinationExists == 0) {
      throw new ResponseError(400, "destinationId not found");
    }

    await ReviewModel.create({
      userId: userId,
      destinationId: destinationId,
      startPoint: startPoint,
      Description: Description,
    });

    return;
  }

  static async getReviews() {
    const data = await ReviewModel.find({})
      .populate("userId", "name -_id")
      .populate("destinationId", "Title -_id")
      .lean();

    return data;
  }

  static async update(requestBody, id) {
    if (!id) {
      throw new ResponseError(400, "Please insert id first");
    }
    const isIdExists = await ReviewModel.find({
      _id : id,
    }).countDocuments();

    if (isIdExists == 0) {
      throw new ResponseError(404, "Id not found");
    }

    const { userId, destinationId, startPoint, Description } = requestBody;
    console.log(requestBody);
    if (!userId || !destinationId || !startPoint || !Description) {
      throw new ResponseError(400, "Data must be filled");
    }

    const isDataExists = await UserModel.find({
      _id: userId,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(400, "userId not found");
    }

    const isDestinationExists = await DestinationModel.find({
      _id: destinationId,
    }).countDocuments();

    if (isDestinationExists == 0) {
      throw new ResponseError(400, "destinationId not found");
    }

    await ReviewModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        userId: userId,
        destinationId: destinationId,
        startPoint: startPoint,
        Description: Description,
      }
    );
  }

  static async deleteReview(id) {
    console.log(id);
    if (!id) {
      throw new ResponseError(404, "Please insert id first");
    }

    const isDataExists = await ReviewModel.find({
      _id: id,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(404, "Data not found");
    }

    await ReviewModel.deleteOne({ _id: id });
  }
}
