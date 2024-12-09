import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomepagePost } from '../services/operations/postAPI';
import Post from '../components/Post';

const Homepage = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth)
    const { homepagePosts } = useSelector((state) => state.post)

    // Fetch posts when the component mounts
    useEffect(() => {
        dispatch(getHomepagePost(token))
        console.log("Homepage Posts: ", homepagePosts)
    }, [dispatch, token])

  return (
    <div className="w-full p-5 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homepagePosts && homepagePosts.length > 0 ? (
          homepagePosts.map((post, index) => (
            <Post key={index} post={post} />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
