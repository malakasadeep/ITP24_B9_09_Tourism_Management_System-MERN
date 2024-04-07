import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import packageRouter from "./routes/package.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//sasindu
import hotels from "./routes/hotels.js";

//vehicle
import Vehicle from "./routes/Vehicle.js";

//shadini
import trainRouter from './routes/train.routes.js';

//dewni
import eventRouter from "./routes/events.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to Mongo DB successfully!!!");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo");
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server listening on port 3000!!!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/Package", packageRouter);

//dewni
app.use("/api/events", eventRouter);

//vehicle
app.use("/api/vehicle", Vehicle);

//shadini
app.use("/api/train",trainRouter);

//sasindu
app.use("/api/hotels", hotels);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
