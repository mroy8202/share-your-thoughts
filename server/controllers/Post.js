const Post = require("../models/postModel");
const User = require("../models/userModel");

// create post
exports.createPost = async (req, res) => {
    try {
        // fetch user
        const userId = req.user.id;

        // fetch details from req.body
        const { title, body } = req.body;

        // validate details
        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "User not logged in"
            });
        }
        if(!title || !body) {
            return res.status(400).json({
                success: false,
                message: "title and body is necessary for creating a blog, please fill all the details"
            });
        }

        // create post in database
        const post = await Post.create({
            title,
            body,
            postedBy: userId,
        });
        
        // update user schema with post
        await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    posts: post._id,
                }
            }
        );

        // return a successfull resonse
        return res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating post"
        });
    }
};

// editPost
exports.editPost = async (req, res) => {
    try {
        // fetch postId from params
        const postId = req.params.id;

        // fetch user id
        const userId = req.user.id;

        // fetch new details from user id
        const { title, body } = req.body;

        // validate the new details
        if(!title && !body) {
            return res.status(400).json({
                success: false,
                message: "At least one field (title or body) is required to update the post.",
            });
        }

        // fetch the post that has to be edited
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found with the given ID.",
            });
        }

        // check if user id authorised to edit the post
        if(userId !== post.postedBy.toString()) {
            return res.status(403).json({
                success: false,
                message: "User is not authorized to edit this post.",
            });
        }

        // update the post field with new data
        if(title) post.title = title;
        if(body) post.body = body;

        // save the updated post to database
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {title, body},
            {new: true, runValidators: true} // runValidators: Ensures the updated data adheres to the schema's validation rules.
        );

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "Post updated successfully.",
            data: updatedPost,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured while updating the post"
        })
    }
};

// deletePost
exports.deletePost = async (req, res) => {
    try {
        // fetch post id from params
        const postId = req.params.id;

        // fetch post
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(401).json({
                success: false,
                message: "Post could not be found in database with given post id"
            });
        }

        // fetch user
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not found with the given user id, User not logged in"
            });
        } 

        // check if user is authorised to delete the post
        if(userId !== post.postedBy.toString()) {
            return res.status(401).json({
                success: false,
                message: "User is not authorised to delete the post"
            });
        }

        // delete the post
        const deletedPost = await Post.findByIdAndDelete(postId);

        // remove post id from user's schema
        await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    posts: postId
                }
            },
            {new: true}
        );

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured while deleting the post"
        });
    }
};

// getHomepagePost
exports.getHomepagePost = async (req, res) => {
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

// getUserPost
exports.getUserPost = async (req, res) => {
    try {
        // Fetch user ID from `req.user`
        const userId = req.user.id;

        // Fetch the user along with their posts
        const user = await User.findById(userId).populate({
            path: "posts",
            options: { sort: { createdAt: -1 } }, // Sort posts by newest first
        });

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if user has any posts
        if(!user.posts || user.posts.length === 0) {
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

