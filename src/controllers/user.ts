import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequestError, RequestValidationError } from "../errors";
import { User, UserDoc } from "../models/user";

/**
 * user signin method
 * @param req
 * @param res
 * @param next
 */
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // existing user
    const user = await User.findOne({
      $or: [{ email: email }, { mobile: email }],
    });

    if (user) {
      const error = new Error("User not found!");
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * user signup method
 * @param req
 * @param res
 * @param next
 */
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { firstname, lastname, email, password, mobile, roles } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const user = (await User.findOne({
      $or: [{ email }, { mobile }],
    })) as UserDoc;

    if (user) {
      const error = new BadRequestError("Email or Mobile already existed!");
      next(error);
    }

    const newUser = User.addUser({
      firstname,
      lastname,
      email,
      password,
      mobile,
      roles,
    });

    const result = await newUser.save();
    return res.send(result);
  } catch (err) {
    next(err);
  }
};

// export
export { signIn, signUp };
