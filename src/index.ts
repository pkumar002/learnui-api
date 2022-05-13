import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV ?? "development"}` });
import path from "path";
import express from "express";
import { connectDb } from "./db";

// app
const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// server
app.listen(PORT, async () => {
  console.log("Server is running on port =" + PORT);
  await connectDb();
});
