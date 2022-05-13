import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

// Request validation error
class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid request paramters");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  errorSerialize() {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  }
}

export { RequestValidationError };
