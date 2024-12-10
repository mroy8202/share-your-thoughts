import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { composeNewBlog } from '../services/operations/postAPI'
import Loader from '../components/Loader'

const ComposeNew = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { token } = useSelector((state) => state.auth)
    const { postLoading } = useSelector((state) => state.post)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("title", title)
        formData.append("body", body)
        formData.append("postImage", selectedImage)

        // dispatch
        dispatch(composeNewBlog(formData, token, navigate))
    }

    return (
        <div className=''>
            {postLoading ? (
                <Loader />
            ): (
                <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-5">
                        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Enter title..."
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>

                    {/* Body */}
                    <div className="mb-5">
                        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-700">
                            Body
                        </label>
                        <textarea
                            name="body"
                            value={body}
                            onChange={e => setBody(e.target.value)}
                            placeholder="Enter body..."
                            className="block w-full p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 text-base resize-none h-48 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-5">
                        <label htmlFor="user_avatar" className="block mb-2 text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setSelectedImage(e.target.files[0])}
                            className="block w-full text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-900 font-medium rounded-lg px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </form>
            )}
            
        </div>
    )
}

export default ComposeNew