import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV ?? "development"}` });
import path from "path";
import express from "express";
import YAML from "yamljs";
import swagggerUI from "swagger-ui-express";
import moragn from "morgan";
import cors from "cors";
import { connectDb } from "./db";
import { userRoute } from "./api/routes/user";
import { errorHandler } from "./api/middleware/error-handler";

const sPath = path.resolve(__dirname, "./swagger.yaml");
const jsDoc = YAML.load(sPath);

// app
const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:3000" }));

app.use(moragn("dev"));

// routes
app.get("/api", (req, res, next) => {
  return res.send({ message: "Api is running..." });
});

app.use("/api/auth", userRoute);
app.use("/api-docs", swagggerUI.serve, swagggerUI.setup(jsDoc));
// error handler
app.use(errorHandler);
// server
app.listen(PORT, async () => {
  console.log("Server is running on port =" + PORT);
  await connectDb();
});
