import mongoose from "mongoose";

// Route handler
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
    default: null,
  },
  postImagePublicId: {
    type: String,
    default: null,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Export
export default mongoose.model("Post", postSchema);