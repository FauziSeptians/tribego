import { render } from "ejs";
import jwt from "jsonwebtoken";

export const jwtSecret = "your_very_secret_key";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Attach decoded user data to the request object
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid Token" }); // Invalid token format or signature
    } else {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" }); // Other errors
    }
  }
};
