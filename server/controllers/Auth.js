import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

// Signup
export const signup = async (req, res) => {
    try {
        // Fetch email, password, and confirmPassword from req.body
        const { email, password, confirmPassword } = req.body;

        // Validate data
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if the user is already registered
        const registeredUser = await User.findOne({ email });
        if (registeredUser) {
            return res.status(403).json({
                success: false,
                message: "User already registered",
            });
        }

        // Hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const user = await User.create({
            email,
            password: hashedPassword,
        });

        // Return a successful response
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered",
        });
    }
};

// Login
export const login = async (req, res) => {
    try {
        // Fetch data from req.body
        const { email, password } = req.body;

        // Validate data
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if user exists
        const registeredUser = await User.findOne({ email });
        if (!registeredUser) {
            return res.status(400).json({
                success: false,
                message: "User is not registered, signup first",
            });
        }

        // Match password
        const isPasswordMatch = await bcrypt.compare(password, registeredUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Password does not match",
            });
        }

        // Create JWT token
        const payload = {
            id: registeredUser._id,
            email: registeredUser.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

        registeredUser.token = token;
        registeredUser.password = undefined;

        // Return a successful response through cookies
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        return res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user: registeredUser,
            message: "User logged in successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while login",
        });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        // Clear the cookie token
        const options = {
            expires: new Date(0),
            httpOnly: true,
        };
        res.cookie("token", "", options);

        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while logging out",
        });
    }
};
