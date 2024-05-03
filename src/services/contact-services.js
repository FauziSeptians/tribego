import { ResponseError } from "../error/errors.js";
import hashPassword from "../utils/hashPassword.js";
import { UserModel } from "../model/users-model.js";
import CompareHashPassword from "../utils/compareHashPassword.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../middleware/auth-middleware.js";
import { ContactModel, contactSchema } from "../model/contact-model.js";

export class ContactServices {
  static async create(requestBody) {
    const { Name, Email, PhoneNumber, Subject, Message } = requestBody;

    if (!Name || !Email || !PhoneNumber || !Subject || !Message) {
      throw new ResponseError(400, "Data must be filled");
    }

    await ContactModel.create({
      Name: Name,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Subject: Subject,
      Message: Message,
    });

    return;
  }

  static async getContact() {
    const data = await ContactModel.find({});

    return data;
  }

  static async delete(id) {
    await ContactModel.deleteOne({ _id: id });
  }
}
