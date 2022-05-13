import jwt from "jsonwebtoken";
import { UserDoc } from "../models/user";

/**
 * Jwt
 */
export class Jwt {
  static genToken(user: UserDoc) {
    return jwt.sign(
      { email: user.email, userId: user.id },
      process.env.SECRET_KEY!,
      { expiresIn: "1h" }
    );
  }

  static tokenVerify(token: string) {
    return jwt.verify(token, process.env.SECRET_KEY!);
  }
}
