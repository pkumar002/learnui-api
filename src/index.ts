import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV ?? "development"}` });
import path from "path";
import express, { NextFunction } from "express";
import { connectDb } from "./db";
import { userRoute } from "./routes/user";
import { errorHandler } from "./middleware/error-handler";

// app
const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes
app.get("/api", (req, res, next) => {
  return res.send({
    message: "Api is running...",
  });
});
app.use("/api/auth", userRoute);

// error handler
app.use(errorHandler);
// server
app.listen(PORT, async () => {
  console.log("Server is running on port =" + PORT);
  await connectDb();
});
