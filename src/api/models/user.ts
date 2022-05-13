import mongoose from "mongoose";
import { regExp, Password } from "../util";
import { randomBytes } from "crypto";

const Schema = mongoose.Schema;

interface UserAttrs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile: string;
  roles: String;
  avatar?: string;
  active?: boolean;
  token?: string;
  tokenExpiration?: number;
  verify?: boolean;
}

export interface UserDoc extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile: string;
  roles: String;
  avatar?: string;
  active?: boolean;
  token?: string;
  tokenExpiration?: number;
  verify?: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
  addUser(attrs: UserAttrs): UserDoc;
  tokenGenerate(): string;
}

/**
 * User schema
 */
const userSchema = new Schema<UserDoc>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    mobile: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v: any) {
          return regExp.mobile.test(v);
        },
      },
    },
    avatar: String,
    token: String,
    tokenExpiration: Number,
    roles: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
    active: { type: Boolean, default: true },
    verify: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const password = await Password.toHash(this.get("password"));
    this.set("password", password);
  }
  const isAdmin = ["admin", "superadmin"].includes(this.get("roles"))
    ? true
    : false;
  this.set("verify", isAdmin);
  done();
});

// static methods
userSchema.statics.addUser = (attr: UserAttrs) => {
  return new User(attr);
};

// generate token
userSchema.statics.tokenGenerate = () => {
  let token = randomBytes(32);
  return token;
};

// user schema
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// export
export { User };
