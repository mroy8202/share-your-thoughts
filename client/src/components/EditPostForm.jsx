import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../services/operations/postAPI";

const EditPostForm = ({ post, closeModal }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        title: post.title,
        body: post.body,
        postImage: null, // New field for the image
    });

    const [previewImage, setPreviewImage] = useState(post.postImage || null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, postImage: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("body", formData.body);
        if (formData.postImage) {
            formDataToSend.append("postImage", formData.postImage);
        }

        dispatch(editPost(post._id, formDataToSend, token, closeModal));
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            {/* Title */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>

            {/* Body */}
            <div className="mb-4">
                <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                    Body
                </label>
                <textarea
                    id="body"
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    rows="4"
                    required
                />
            </div>

            {/* Image */}
            <div className="mb-4">
                <label htmlFor="postImage" className="block text-sm font-medium text-gray-700">
                    Post Image
                </label>
                <input
                    type="file"
                    id="postImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer"
                />
                {previewImage && (
                    <div className="mt-2">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="h-40 w-auto border border-gray-300 rounded-md"
                        />
                    </div>
                )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default EditPostForm;
