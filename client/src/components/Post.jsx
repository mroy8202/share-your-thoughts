import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import noThumbnail from "../assets/noThumbnail.png";
import { deletePost } from "../services/operations/postAPI";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post, currentUserEmail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);

  const DeleteButtonHandler = (e) => {
    e.stopPropagation(); // Prevent navigation when the delete button is clicked
    const postId = post._id;
    dispatch(deletePost(postId, token, navigate)); // Call delete action
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      {/* Wrapping the post image and content in Link for navigation */}
      <Link 
        to={`/post/${post._id}`} 
        state={post} // Pass post data to PostDetail via state
        className="block"
      >
        {/* Post Image */}
        <img
          className="rounded-t-lg"
          src={post.postImage || noThumbnail} // If post has image, use it; otherwise, use the default image
          alt={post.title} // Alt text for accessibility
        />
        <div className="p-5">
          {/* Post Title */}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {post.title}
          </h5>

          {/* Post Body */}
          <p className="mb-3 font-normal text-gray-700">
            {/* Display first 100 characters of post body or full text if it's shorter */}
            {post.body.length > 100 ? `${post.body.slice(0, 100)}...` : post.body}

            {/* If post is longer than 100 characters, show 'read more' link */}
            {post.body.length > 100 && (
              <span className="text-blue-600 hover:underline cursor-pointer">
                {" "}read more
              </span>
            )}
          </p>

          {/* Post Author */}
          <div className="text-sm text-gray-600 mb-3">
            Posted By: <span className="font-medium text-gray-900">{post?.postedBy?.email}</span>
          </div>
        </div>
      </Link>

      {/* Button Container */}
      {currentUserEmail === post?.postedBy?.email && location.pathname === "/user/post" && (
        <div className="flex space-x-2 px-5 pb-5">
          {/* Edit button */}
          <button 
            type="button" 
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Edit
          </button>

          {/* Delete button */}
          <button 
            type="button"
            onClick={DeleteButtonHandler} // Call the delete handler
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
