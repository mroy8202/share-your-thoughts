import Post from "../models/postModel.js";
import User from "../models/userModel.js";

// Create Post
export const createPost = async (req, res) => {
    try {
        // Fetch user
        const userId = req.user.id;

        // Fetch details from req.body
        const { title, body } = req.body;

        // Validate details
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not logged in",
            });
        }
        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: "Title and body are necessary for creating a blog, please fill all the details",
            });
        }

        // Create post in database
        const post = await Post.create({
            title,
            body,
            postedBy: userId,
        });

        // Update user schema with post
        await User.findByIdAndUpdate(userId, {
            $push: {
                posts: post._id,
            },
        });

        // Return a successful response
        return res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: post,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating post",
        });
    }
};

// Edit Post
export const editPost = async (req, res) => {
    try {
        // Fetch postId from params
        const postId = req.params.id;

        // Fetch user id
        const userId = req.user.id;

        // Fetch new details from user input
        const { title, body } = req.body;

        // Validate the new details
        if (!title && !body) {
            return res.status(400).json({
                success: false,
                message: "At least one field (title or body) is required to update the post.",
            });
        }

        // Fetch the post that needs to be edited
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found with the given ID.",
            });
        }

        // Check if user is authorized to edit the post
        if (userId !== post.postedBy.toString()) {
            return res.status(403).json({
                success: false,
                message: "User is not authorized to edit this post.",
            });
        }

        // Update the post fields with new data
        if (title) post.title = title;
        if (body) post.body = body;

        // Save the updated post to database
        const updatedPost = await Post.findByIdAndUpdate(postId, { title, body }, { new: true, runValidators: true });

        // Return a successful response
        return res.status(200).json({
            success: true,
            message: "Post updated successfully.",
            data: updatedPost,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating the post",
        });
    }
};

// Delete Post
export const deletePost = async (req, res) => {
    try {
        // Fetch post id from params
        const postId = req.params.id;

        // Fetch post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(401).json({
                success: false,
                message: "Post could not be found in database with the given post id",
            });
        }

        // Fetch user
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not found with the given user id, User not logged in",
            });
        }

        // Check if user is authorized to delete the post
        if (userId !== post.postedBy.toString()) {
            return res.status(401).json({
                success: false,
                message: "User is not authorized to delete the post",
            });
        }

        // Delete the post
        const deletedPost = await Post.findByIdAndDelete(postId);

        // Remove post id from user's schema
        await User.findByIdAndUpdate(userId, {
            $pull: {
                posts: postId,
            },
        }, { new: true });

        // Return a successful response
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: deletedPost,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while deleting the post",
        });
    }
};

// Get Homepage Post
export const getHomepagePost = async (req, res) => {
    try {
        // Optional: Implement pagination and sorting
        const { page = 1, limit = 10 } = req.query;

        // Fetch all posts with pagination, sorting by newest first
        const posts = await Post.find()
            .sort({ createdAt: -1 }) // Newest posts first
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate("postedBy", "name email"); // Populate user details

        // Count total posts for pagination metadata
        const totalPosts = await Post.countDocuments();

        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: {
                posts,
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching posts",
        });
    }
};

// Get User Post
export const getUserPost = async (req, res) => {
    try {
        // Fetch user ID from `req.user`
        const userId = req.user.id;

        // Fetch the user along with their posts
        const user = await User.findById(userId).populate({
            path: "posts",
            options: { sort: { createdAt: -1 } }, // Sort posts by newest first
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if user has any posts
        if (!user.posts || user.posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found for the user",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User posts fetched successfully",
            data: user.posts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching user posts",
        });
    }
};
