import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPost } from '../services/operations/postAPI'
import Post from '../components/Post'
import Loader from '../components/Loader'

const UserPost = () => {
    const dispatch = useDispatch()
    const { token } = useSelector( (state) => state.auth )
    const { userPosts, user, postLoading } = useSelector( (state) => state.post )

    useEffect(() => {
        dispatch(getUserPost(token))
    }, [dispatch, token,])

  return (
    <div className="w-full p-5 bg-gray-100">
      {postLoading ? (
        <Loader />
      ): (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts && userPosts.length > 0 ? (
            userPosts.map((post, index) => (
              <Post key={index} post={post} currentUserEmail={user?.email}  />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      )}
    </div>
  )
}

export default UserPost