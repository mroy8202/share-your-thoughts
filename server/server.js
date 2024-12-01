const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/UserRoute");
const postRoute = require("./routes/PostRoute");

require("dotenv").config();

const port = process.env.PORT || 4000;

// database connection
const database = require("./config/database");
database.connect();

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