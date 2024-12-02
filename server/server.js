import express from 'express';
const app = express();
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import userRoute from "./routes/UserRoute.js";
import postRoute from "./routes/PostRoute.js";

const port = process.env.PORT || 4000;

// database connection
import { connect } from './config/database.js';
connect();

// middlewares
app.use(express.json());
app.use(cookieParser());

// mount routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/post", postRoute)

// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to default route"
    })
});

// activate server
app.listen(port, () => {
    console.log(`App is running at port: ${port}`)
});