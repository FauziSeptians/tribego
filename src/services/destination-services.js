import { ResponseError } from "../error/errors.js";
import { DestinationModel } from "../model/destination-model.js";

export class DestinationServices {
  static async create(images, requestBody) {
    const data = JSON.parse(requestBody);

    if (!data) {
      throw new ResponseError(400, "Data must be filled");
    }

    console.log(data.Title);

    const isDataExists = await DestinationModel.findOne({
      Title: data.Title,
    });

    console.log(isDataExists);

    if (isDataExists != null) {
      throw new ResponseError(400, "Title already exists");
    }

    await DestinationModel.create({
      Title: data.Title,
      Location: data.Location,
      Description: data.Description,
      Images: images,
      Price: data.Price,
      Promo: data.Promo,
    });

    return;
  }

  static async getDestination() {
    const data = await DestinationModel.find({});

    return data;
  }

  static async getDestinationById(id) {
    const data = await DestinationModel.findOne({
      _id: id,
    });

    console.log("test")
    console.log(data.length)

    return data;
  }

  static async update(images, data, id) {
    console.log(images);
    const newData = JSON.parse(data);
    const { Title, Location, Description, Price, Promo } = newData;

    console.log(newData);
    console.log(id);
    if (!Title || !Location || !Description || !Price || !Promo) {
      throw new ResponseError(404, "Please insert data first");
    }

    if (!id) {
      throw new ResponseError(404, "Please insert id first");
    }

    const isDataExists = await DestinationModel.findOne({
      _id: id,
    }).countDocuments();

    console.log(isDataExists);

    if (isDataExists == 0) {
      throw new ResponseError(404, "Data not found");
    }

    await DestinationModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        Title: Title,
        Location: Location,
        Description: Description,
        Price: Price,
        Promo: Promo,
        Images: images,
      }
    );
  }

  static async deleteDestination(id) {
    console.log(id);
    if (!id) {
      throw new ResponseError(404, "Please insert id first");
    }

    const isDataExists = await DestinationModel.find({
      _id: id,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(404, "Data not found");
    }

    await DestinationModel.deleteOne({ _id: id });
  }
}
