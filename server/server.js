import express from 'express';
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';
import dotenv from "dotenv";
import cors from 'cors';

import { connect } from './config/database.js';
import { cloudinaryConnect } from './config/cloudinary.js';
import userRoute from "./routes/UserRoute.js";
import postRoute from "./routes/PostRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Database connection
connect();

// Middlewares
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://share-your-thoughts-frontend.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.options('*', cors()); // Handle preflight requests

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Cloudinary connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/post", postRoute);

// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to default route"
    });
});

// Activate server
app.listen(port, () => {
    console.log(`App is running at port: ${port}`);
});