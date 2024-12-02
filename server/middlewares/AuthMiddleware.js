import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Auth middleware
export const auth = async (req, res, next) => {
    try {
        // Extract token
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        // Validate token presence
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is missing",
            });
        }

        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Attach decoded token to request object
            req.user = decoded;
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid",
                error: err.message,
            });
        }

        // Proceed to the next middleware
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while validating the token",
            error: error.message,
        });
    }
};