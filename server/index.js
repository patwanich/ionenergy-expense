import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import upload from "./middlewares/upload.js";
import * as s3Client from "./utilities/s3Client.js";
import crypto from "crypto";
import sharp from "sharp";
import expenseRoute from "./routes/expenseRoute.js";
import authRoute from "./routes/authRoute.js";
import reportRoute from "./routes/reportRoute.js";
import verifyToken from "./middlewares/verifyToken.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/expenses", verifyToken, expenseRoute);
app.use("/reports", verifyToken, reportRoute);
app.use("/auth", verifyToken, authRoute);

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
