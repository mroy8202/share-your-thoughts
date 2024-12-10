import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noThumbnail from "../assets/noThumbnail.png";
import { deletePost } from "../services/operations/postAPI";
import EditPostForm from "./EditPostForm";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post, currentUserEmail }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const [isEditing, setIsEditing] = useState(false);

    const DeleteButtonHandler = (e) => {
        e.stopPropagation();
        const postId = post._id;
        dispatch(deletePost(postId, token, navigate));
    };

    const openEditForm = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const closeEditForm = () => {
        setIsEditing(false);
    };

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            {isEditing ? (
                <EditPostForm post={post} closeModal={closeEditForm} />
            ) : (
              <>
                  <Link to={`/post/${post._id}`} state={post} className="block">
                      <img
                          className="rounded-t-lg w-full h-auto object-cover"
                          src={post.postImage || noThumbnail}
                          alt={post.title}
                      />
                      <div className="p-5">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate">
                              {post.title}
                          </h5>
                          <p className="mb-3 font-normal text-gray-700 break-words whitespace-pre-wrap">
                              {post.body.length > 100 ? `${post.body.slice(0, 100)}...` : post.body}
                              {post.body.length > 100 && (
                                <span className="text-blue-600 hover:underline cursor-pointer">
                                  {" "}read more
                                </span>
                              )}
                          </p>
                          <div className="text-sm text-gray-600 mb-3">
                              Posted By:{" "}
                              <span className="font-medium text-gray-900">
                                  {post?.postedBy?.email}
                              </span>
                          </div>
                      </div>
                  </Link>
                  {currentUserEmail === post?.postedBy?.email && location.pathname === "/user/post" && (
                      <div className="flex space-x-2 p-4">
                          <button
                              type="button"
                              onClick={openEditForm}
                              className="px-4 py-2 bg-yellow-200 text-gray-800 rounded-md"
                          >
                              Edit
                          </button>
                          <button
                              type="button"
                              onClick={DeleteButtonHandler}
                              className="px-4 py-2 bg-red-600 text-white rounded-md"
                          >
                              Delete
                          </button>
                      </div>
                  )}
              </>

            )}
        </div>
    );
};

export default Post;