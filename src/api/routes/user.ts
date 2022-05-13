import express from "express";
import { signIn, signUp } from "../controllers/user";
import { body } from "express-validator";
import { User } from "../models/user";
import { validateRequest } from "../middleware/validate-request";
import { regExp } from "../util";
const route = express.Router();

const signupValidaton = [
  body("firstname", "firstname is required").not().isEmpty(),
  body("lastname", "lastname is requried!").notEmpty(),
  body("email", "email is required!")
    .isEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email id already existed!");
      }
      return user;
    }),
  body("password", "password is required!")
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be 8 to 16 char long.")
    .matches(regExp.password)
    .withMessage(
      "Password must be one caps, one samll, and alpha numeric with symbol min and max length between 8 - 16."
    ),
  body("mobile", "mobile is required!")
    .notEmpty()
    .custom(async (mobile) => {
      const user = await User.findOne({ mobile });
      if (user) {
        return Promise.reject("Mobile already existed!");
      }
      return user;
    }),
];

/**
 * Method               POST
 * Url                  http://localhost:3002/api/auth
 *
 */
route.post("/", signIn);

/**
 * Method               POST
 * Url                  http://localhost:3002/api/auth/signup
 *
 */
route.post("/signup", signupValidaton, validateRequest, signUp);

// export
export { route as userRoute };
