import mongoose from "mongoose";
import { dbConfig } from "./api/config/db.config";

let url = "";
if (process.env.NODE_ENV === "development") {
  url = `mongodb://${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB}`;
} else {
  url =
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@` +
    process.env.DB_URL;
}
console.log(url);
/**
 * Connect database
 */
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(url);
    console.log("DATABASE CONNECTED!");
  } catch (err) {
    console.log("DB error", err);
  }
};

// export
export { connectDb };
