import { CustomError } from "./custom-error";

/**
 * Db connection error
 */
class DbConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database!";
  constructor(public message: string) {
    super("Error connecting to db");
    Object.setPrototypeOf(this, DbConnectionError.prototype);
  }
  errorSerialize() {
    return [
      {
        message: this.message ?? this.reason,
      },
    ];
  }
}

export { DbConnectionError };
