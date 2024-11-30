const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
require("dotenv").config();

// signup
exports.signup = async (req, res) => {
    try {
        // fetch email, password from the req.body
        const { email, password, confirmPassword } = req.body;

        // validate data
        if(!email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // check if the user is already registered
        const registeredUser = await User.findOne({email});
        if(registeredUser) {
            return res.status(403).json({
                success: false,
                message: "User already registered",
            })
        } 

        // hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user in database
        const user = await User.create({
            email,
            password: hashedPassword
        })

        // return a successfull responce
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: user,
        })
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered"
        });
    }
};

// login
exports.login = async (req, res) => {
    try {
        // fetch data from req.body
        const { email, password } = req.body;

        // validate data
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check if user exists or not
        const registeredUser = await User.findOne({email});
        if(!registeredUser) {
            return res.status(400).json({
                success: false,
                message: "User is not registered, signup first"
            });
        } 

        // match password
        const isPassWord = await bcrypt.compare(password, registeredUser.password);
        if(!isPassWord) {
            return res.status(400).json({
                success: false,
                message: "Password do not match"
            });
        }

        // create jwt token
        const payload = {
            id: registeredUser._id,
            email: registeredUser.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

        registeredUser.token = token;
        registeredUser.password = undefined;

        // return a successfull response through cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        // console.log("USER: ", registeredUser);

        return res.cookie("token", token, options).status(200).json({
            success: true,
            token: token,
            user: registeredUser,
            message: "User logged in successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured while login",
        });
    }
}

