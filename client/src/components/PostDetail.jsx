import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import noThumbnail from "../assets/noThumbnail.png";
import { deletePost } from "../services/operations/postAPI";
import Loader from "./Loader";

const PostDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation(); // Get the location object
  const post = location.state; // Get the post data from state
  const { user, postLoading } = useSelector((state) => state.post); // Get logged-in user details
  const { token } = useSelector((state) => state.auth)

  if (!post) return <div>Loading...</div>; // If no post data, show loading state

  // Check if the current user is the post author
  const isPostAuthor = user?.email === post.postedBy?.email;

  const DeletePostHandler = () => {
    const postId = post._id
    dispatch(deletePost(postId, token, navigate))
  }

  return (
    <div>
      {postLoading ? (
        <Loader />
      ): (
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow p-5">
          {/* Post Image */}
          <img
            className="rounded-t-lg"
            src={post.postImage || noThumbnail} // Default image if no image exists
            alt={post.title}
          />

          {/* Post Title */}
          <h1 className="text-3xl font-bold mt-5">{post.title}</h1>

          {/* Post Body */}
          <p className="text-lg mt-5">{post.body}</p>

          {/* Post Author */}
          <div className="text-sm text-gray-600 mt-5">
            Posted By: <span className="font-medium text-gray-900">{post?.postedBy?.email}</span>
          </div>

          {/* Edit and Delete Buttons (Visible only to the author) */}
          {isPostAuthor && (
            <div className="flex space-x-3 mt-5">
              {/* Edit Button */}
              <button
                type="button"
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={DeletePostHandler}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    
  );
};

export default PostDetail;