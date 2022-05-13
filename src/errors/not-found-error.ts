import { CustomError } from "./custom-error";

// Not Found Error
class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(public message: string) {
    super("Route Not found!");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  errorSerialize() {
    return [{ message: this.message }];
  }
}

export { NotFoundError };
