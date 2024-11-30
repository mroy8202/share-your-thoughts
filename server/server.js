const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 4000;

// database connection
const database = require("./config/database");
database.connect();

// middlewares
app.use(cookieParser());

// mount routes


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