import { ResponseError } from "../error/errors.js";
import hashPassword from "../utils/hashPassword.js";
import { BookedModel } from "../model/booked-model.js";
import CompareHashPassword from "../utils/compareHashPassword.js";
import { DestinationModel } from "../model/destination-model.js";
import { UserModel } from "../model/users-model.js";

export class BookServices {
  static async create(requestBody) {
    console.log(requestBody);
    const {
      userId,
      destinationId,
      guest,
      startBook,
      endBook,
      destinationName,
    } = requestBody;

    if (!userId) {
      throw new ResponseError(400, "you must login first");
    }

    if (!guest || !startBook || !endBook) {
      throw new ResponseError(400, "Data must be filled");
    }

    const isDataExists = await UserModel.find({
      _id: userId,
    }).countDocuments();

    if (isDataExists == 0) {
      x;
      throw new ResponseError(400, "data not found");
    }

    const isDestinationNameExists = await DestinationModel.find({
      Title: destinationName,
    }).countDocuments();

    if (isDestinationNameExists == 0) {
      throw new ResponseError(400, "Destination Name not found");
    }

    if (new Date(startBook) > new Date(endBook)) {
      throw new ResponseError(400, "Start booked not allowed after end booked");
    }

    await BookedModel.create({
      userId: userId,
      destinationName: destinationName,
      guest: guest,
      startBook: startBook,
      endBook: endBook,
    });

    return;
  }

  static async getBook() {
    const data = await BookedModel.find({})
      .populate("userId", "name _id")
      .populate("destinationId", "Title Images -_id")
      .lean();

    console.log(data);

    return data;
  }

  static async getBookByIdUser(id) {
    if (!id) {
      throw new ResponseError(400, "Please insert id first");
    }

    const data = await BookedModel.find({
      userId: id,
    }).populate("userId", "name -_id");

    const isDataExists = await BookedModel.find({
      userId: id,
    }).countDocuments();

    if (isDataExists == 0) {
      return [];
    }
    const Destination = await DestinationModel.find({});

    data.Images = Destination.Images;

    return {
      data: data,
      Destination: Destination,
    };
  }

  static async update(requestBody, id) {
    if (!id) {
      throw new ResponseError(400, "Please insert id first");
    }
    const isIdExists = await BookedModel.find({
      _id: id,
    }).countDocuments();

    if (isIdExists == 0) {
      throw new ResponseError(404, "Id not found");
    }

    const { userId, destinationName, guest, startBook, endBook } = requestBody;
    console.log("test");
    console.log(requestBody);
    if (!userId || !destinationName || !guest || !startBook || !endBook) {
      throw new ResponseError(400, "Data must be filled");
    }

    const isDataExists = await UserModel.find({
      _id: userId,
    }).countDocuments();
    console.log(isDataExists);

    if (isDataExists == 0) {
      throw new ResponseError(400, "UserId not found");
    }

    const isDestinationExists = await DestinationModel.find({
      Title: destinationName,
    }).countDocuments();

    if (isDestinationExists == 0) {
      throw new ResponseError(400, "DestinationId not found");
    }

    if (new Date(startBook) > new Date(endBook)) {
      throw new ResponseError(400, "Start booked not allowed after end booked");
    }

    await BookedModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        userId: userId,
        destinationName: destinationName,
        guest: guest,
        startBook: startBook,
        endBook: endBook,
      }
    );
  }

  static async deleteBook(id) {
    console.log(id);
    if (!id) {
      throw new ResponseError(404, "Please insert id first");
    }

    const isDataExists = await BookedModel.find({
      _id: id,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(404, "Data not found");
    }

    await BookedModel.deleteOne({ _id: id });
  }
}
