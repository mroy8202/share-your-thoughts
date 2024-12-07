import express from "express";
const router = express.Router();

// import 
import { auth } from "../middlewares/AuthMiddleware.js";
import { createPost, editPost, deletePost, getHomepagePost, getUserPost } from "../controllers/Post.js";

// Route handlers
router.post("/createPost", auth, createPost);
router.delete("/deletePost/:id", auth, deletePost);
router.put("/editPost/:id", auth, editPost);
router.get("/getHomepagePost", auth, getHomepagePost);
router.get("/getUserPost", auth, getUserPost);

// Export router
export default router;
