import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import packageRouter from "./routes/package.route.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

//sasindu
import Hotel from "./routes/hotels.js";

//vehicle
import Vehicle from "./routes/Vehicle.js";

//shadini
import trainRouter from "./routes/train.routes.js";

//dewni
import eventRouter from "./routes/events.js";

//prabodhi
import guideRouter from "./routes/tour-guideRouter.js";

//mithun
import restaurantRouter from "./routes/restaurant.route.js";
import respackageRouter from "./routes/res.package.route.js";

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

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server listening on port 3000!!!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/Package", packageRouter);

//sasindu
app.use("/api/hotel", Hotel);

//dewni
app.use("/api/events", eventRouter);

//vehicle
app.use("/api/vehicle", Vehicle);

//shadini
app.use("/api/train", trainRouter);

//prabodhi
app.use("/api/tour-guide", guideRouter);

//mithun
app.use("/api/restaurant", restaurantRouter);
app.use("/api/package", respackageRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// server.js

app.use(bodyParser.json());

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sadeepmalaka2@gmail.com",
    pass: "bfxr wzmt jalb grxp",
  },
});

// OTP storage
const otpMap = new Map(); // Key: email, Value: OTP

// Route to handle sign-up and email sending
app.post("/api/auth/sendotp", (req, res) => {
  const { email } = req.body;
  console.log("Received email:", email);
  const generateOTP = () => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  const otp = generateOTP(); // Function to generate OTP
  otpMap.set(email, otp); // Store OTP for the email

  const mailOptions = {
    from: "sadeepmalaka2@gmail.com",
    to: email,
    subject: "Email Verification OTP",
    html: `
    <html>
      <head>
        <style>
          /* Add your custom styles here */
          body {
            font-family: Arial, sans-serif;
            color: #000;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo img {
            max-width: 150px;
          }
          .content {
            margin-bottom: 20px;
          }
          .otp {
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            border-radius: 5px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/mern-tourism.appspot.com/o/Home-BG%2FLogo14.png?alt=media&token=0a278684-1f9b-42b3-9e3c-a40b9e6141c6" alt="Your Website Logo" />
          </div>
          <div class="content">
            <p>Dear User,</p>
            <p>Thank you for signing up on Your Website. To complete your registration, please use the following OTP (One Time Password):</p>
            <div class="otp">${otp}</div>
            <p>If you didn't request this OTP, please ignore this email.</p>
            <p>Best Regards,<br/>Your Website Team</p>
          </div>
        </div>
      </body>
    </html>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Failed to send OTP email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send({ success: true, message: "OTP sent successfully" });
    }
  });
});

// Route to verify OTP
app.post("/api/auth/verifyotp", (req, res) => {
  const { email, otp } = req.body;
  const storedOTP = otpMap.get(email);

  if (!storedOTP) {
    return res
      .status(400)
      .json({ success: false, message: "OTP not found for the email" });
  }

  if (otp !== storedOTP) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  // OTP is valid, proceed with account creation or any other action
  res.status(200).json({ success: true, message: "OTP verified successfully" });
});
