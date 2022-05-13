import { NextFunction, Response, Request } from "express";
import { CustomError } from "../errors";

/**
 * Error Handler
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns
 */
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .send({ errors: error.errorSerialize() });
  }

  res.send({
    error: "Something went wrong",
  });
};

// export
export { errorHandler };
