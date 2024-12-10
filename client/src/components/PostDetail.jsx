import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import noThumbnail from "../assets/noThumbnail.png";
import Loader from "./Loader";

const PostDetail = () => {
  const location = useLocation(); // Get the location object
  const post = location.state; // Get the post data from state
  const { postLoading } = useSelector((state) => state.post); // Get logged-in user details

  if (!post) return <div>Loading...</div>; // If no post data, show loading state

  return (
    <div>
      {postLoading ? (
        <Loader />
      ): (
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow p-5">
            {/* Post Image */}
            <img
                className="rounded-t-lg w-full h-auto object-cover"
                src={post.postImage || noThumbnail} // Default image if no image exists
                alt={post.title}
            />

            {/* Post Title */}
            <h1 className="text-3xl font-bold mt-5 break-words">{post.title}</h1>

            {/* Post Body */}
            <p className="text-lg mt-5 break-words whitespace-pre-wrap">{post.body}</p>

            {/* Post Author */}
            <div className="text-sm text-gray-600 mt-5">
                Posted By: <span className="font-medium text-gray-900">{post?.postedBy?.email}</span>
            </div>
        </div>

      )}
    </div>
    
  );
};

export default PostDetail;