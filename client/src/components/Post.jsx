import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import noThumbnail from '../assets/noThumbnail.png';

const Post = ({ post }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      {/* Wrapping the whole card in Link for navigation */}
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
          <div className="text-sm text-gray-600">
            Posted By: <span className="font-medium text-gray-900">{post.postedBy.email}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;