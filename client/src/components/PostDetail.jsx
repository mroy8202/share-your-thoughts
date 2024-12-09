import React from "react";
import { useLocation } from "react-router-dom"; // To access the passed state
import noThumbnail from '../assets/noThumbnail.png';

const PostDetail = () => {
  const location = useLocation(); // Get the location object
  const post = location.state; // Get the post data from state

  console.log("Location: ", location)
  console.log("post: ", post)

  if(!post) return <div>Loading...</div>; // If no post data, show loading state

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow p-5">
      <img
        className="rounded-t-lg"
        src={post.postImage || noThumbnail} // Default image if no image exists
        alt={post.title}
      />
      <h1 className="text-3xl font-bold mt-5">{post.title}</h1>
      <p className="text-lg mt-5">{post.body}</p>
      <div className="text-sm text-gray-600 mt-5">
        Posted By: <span className="font-medium text-gray-900">{post.postedBy.email}</span>
      </div>
    </div>
  );
};

export default PostDetail;