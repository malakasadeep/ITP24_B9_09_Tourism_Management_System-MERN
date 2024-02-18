import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import packageRouter from './routes/package.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log('Connected to Mongo DB successfully!!!');
    }).catch((err) =>{
        console.log('Error connecting to Mongo');
})


const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server listening on port 3000!!!');
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/Package", packageRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});