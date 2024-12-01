const express = require("express");
const router = express.Router();

// import controllers
const { auth } = require("../middlewares/AuthMiddleware");  
const { createPost, editPost, deletePost, getHomepagePost, getUserPost } = require("../controllers/Post");

// route handler
router.post("/createPost", auth, createPost);
router.delete("/deletePost/:id", auth, deletePost);
router.put("/editPost/:id", auth, editPost);
router.get("/getHomepagePost", getHomepagePost);
router.get("/getUserPost", auth, getUserPost);

// export
module.exports = router;