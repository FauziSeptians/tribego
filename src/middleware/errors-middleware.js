import { ResponseError } from "../error/errors.js";

export const errorMiddleware = async (error, req, res, next) => {
  if (error instanceof ResponseError) {
    return res.status(error.status).json({
      errorsMessage: error.message,
    });
  } else {
    return res.status(500).json({
      errorsMessage: error.message,
    });
  }
};
