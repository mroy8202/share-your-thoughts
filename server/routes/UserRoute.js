import express from "express";
const router = express.Router();

// import
import { signup, login, logout } from "../controllers/Auth.js";

// Handle routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Export router
export default router;
