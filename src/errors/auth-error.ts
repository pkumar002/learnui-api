import { CustomError } from "./custom-error";

// Bad request error
class AuthError extends CustomError {
  statusCode = 401;
  constructor(public message: string = "Not Authorized") {
    super("Not authorized");
    Object.setPrototypeOf(this, AuthError.prototype);
  }
  errorSerialize() {
    return [{ message: this.message }];
  }
}

export { AuthError };
