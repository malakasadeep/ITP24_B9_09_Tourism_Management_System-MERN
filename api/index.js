import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import eventRouter from "./routes/events.js";
import packageRouter from "./routes/package.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";


//sasindu

import hotels from "./routes/hotels.js";
import rooms from "./routes/rooms.js";
import hotelreservationRoute from "./routes/hotelReservationRoute.js";
import path from "path";
const __dirname = path.resolve();

//vehicle
import Vehicle from "./routes/Vehicle.js";


import hotels from './routes/hotels.js';
import rooms from './routes/rooms.js';
import hotelreservationRoute from './routes/hotelReservationRoute.js';
import path from 'path';
const __dirname = path.resolve();

  
 //vehicle
import Vehicle from './routes/Vehicle.js';

import trainRouter from './routes/train.routes.js';
dotenv.config();


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
app.use("/api/events", eventRouter);
app.use("/api/vehicle", Vehicle);
app.use("/api/train",trainRouter);


//sasindu

app.use("/api/hotels", hotels);
app.use("/api/rooms", rooms);
app.use("/api/hotelreservationRoute", hotelreservationRoute);
app.use("/api/images", express.static(path.join(__dirname, "photos")));



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
