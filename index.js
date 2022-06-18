import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost/hotel-mern-stack");
        console.log("Application connected to mongodb successfully");
    }catch(err) {
        throw err
    }
};

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "something went wrong";
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
        stack:err.stack
    })
});

const port = process.env.PORT || 3500;

app.listen(port, () => {
    connect();
    console.log("Successfully connected to backend...")
});