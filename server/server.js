import express from 'express';
const app = express();
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';
import { cloudinaryConnect } from './config/cloudinary.js';
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();

import userRoute from "./routes/UserRoute.js";
import postRoute from "./routes/PostRoute.js";

const port = process.env.PORT || 3000;

// database connection
import { connect } from './config/database.js';
connect();

// middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    // credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connect with cloudinary
cloudinaryConnect()

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