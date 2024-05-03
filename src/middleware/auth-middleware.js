import jwt from "jsonwebtoken";
import { UserServices } from "../services/user-services.js";

export const jwtSecret = "your_very_secret_key";

export const verifyLogin = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/");
    }

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid Token" });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
