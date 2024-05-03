import { ResponseError } from "../error/errors.js";
import hashPassword from "../utils/hashPassword.js";
import { UserModel } from "../model/users-model.js";
import CompareHashPassword from "../utils/compareHashPassword.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../middleware/auth-middleware.js";

export class UserServices {
  static async create(requestBody) {
    const { Email, Password, Name, Role } = requestBody;

    if (!Email || !Password || !Name) {
      throw new ResponseError(400, "Data must be filled");
    }

    if (Role && !["Admin", "User"].includes(Role)) {
      throw new ResponseError(404, "Role not found");
    }

    const isDataExists = await UserModel.find({
      email: Email,
    }).countDocuments();

    if (isDataExists != 0) {
      throw new ResponseError(400, "Email already exits");
    }

    const isNameExists = await UserModel.find({
      name: Name,
    }).countDocuments();

    if (isNameExists != 0) {
      throw new ResponseError(400, "Name already exits");
    }

    await UserModel.create({
      name: Name,
      email: Email,
      password: hashPassword(Password),
      Role: Role,
    });

    return;
  }

  static async login(requestBody) {
    const { Email, Password } = requestBody;

    console.log(requestBody);

    if (!Email || !Password) {
      throw new ResponseError(400, "Data must be filled");
    }

    const isEmailExists = await UserModel.findOne({
      email: Email,
    });

    const isDataExists = await UserModel.findOne({
      email: Email,
    }).countDocuments();

    if (isDataExists == 0) {
      console.log("test");
      throw new ResponseError(404, "Data email not found");
    }

    const isPasswordCorrect = CompareHashPassword(
      Password,
      isEmailExists.password
    );

    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      throw new ResponseError(400, "Email or Password incorrect");
    }

    const payload = { username: isEmailExists.name };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "2h" });
    UserModel.updateOne(
      { email: isEmailExists.email },
      { $set: { token: token } }
    );

    const data = await UserModel.findOne({
      email: Email,
    }).select("name email token Role");

    return data;
  }

  static async getUsers() {
    const dataUsers = await UserModel.find({});

    return dataUsers;
  }

  static async getUser(id) {
    if (!id) {
      throw new ResponseError(404, "Please insert id first");
    }

    const isDataExists = await UserModel.find({
      _id: id,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(404, "Data not found");
    }

    const data = await UserModel.findOne({
      _id: id,
    }).select("name email");

    return data;
  }

  static async update(requestBody, id) {
    const { Email, Password, Name } = requestBody;

    if (!id) {
      throw new ResponseError(404, "Please insert id first");
    }

    const isDataExists = await UserModel.find({
      _id: id,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(404, "Data not found");
    }

    if (!Email || !Password || !Name) {
      throw new ResponseError(400, "Data must be filled");
    }

    await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name: Name,
        email: Email,
        password: Password,
      }
    );
  }

  static async deleteUsers(id) {
    console.log(id);
    if (!id) {
      throw new ResponseError(404, "Please insert id first");
    }

    const isDataExists = await UserModel.find({
      _id: id,
    }).countDocuments();

    if (isDataExists == 0) {
      throw new ResponseError(404, "Data not found");
    }

    await UserModel.deleteOne({ _id: id });
  }
}
