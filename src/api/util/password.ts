import bcrypt from "bcryptjs";

/**
 * Password
 */
export class Password {
  static async toHash(password: string) {
    return await bcrypt.hash(password, 12);
  }

  static async toCompare(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }
}
