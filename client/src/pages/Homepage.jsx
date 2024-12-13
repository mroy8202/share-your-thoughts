import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomepagePost } from '../services/operations/postAPI';
import Post from '../components/Post';
import Loader from '../components/Loader';
import { use } from 'react';

const Homepage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); 
  const { homepagePosts, user, postLoading, totalPages } = useSelector((state) => state.post); 

  const [pageNo, setPageNo] = useState(1);
  const observerRef = useRef(); // Ref to handle the IntersectionObserver instance

  // Fetch posts whenever the page number changes
  useEffect(() => {
    dispatch(getHomepagePost(token, pageNo));
  }, [pageNo]);

  /**
   * Observer logic for infinite scrolling.
   * This function is passed to the last post's ref to observe when it enters the viewport.
   * If it's visible and posts are not loading, increment the page number.
   */
  const lastPostRef = (node) => {
    if (postLoading) return; // Skip if posts are currently loading

    // Stop observing if we are on the last page
    if (pageNo >= totalPages) {
      if (observerRef.current) observerRef.current.disconnect();
      return; // No further observation
    }

    // Disconnect the previous observer, if any
    if (observerRef.current) observerRef.current.disconnect();

    // Create a new IntersectionObserver
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNo((prevPageNo) => prevPageNo + 1); // Load the next page
      }
    });

    // Attach the observer to the provided node
    if (node) observerRef.current.observe(node);
  };

  return (
    <div className="w-full p-5 bg-gray-100">
      {/* Show a loader if posts are loading and it's the initial load */}
      {postLoading && pageNo === 1 ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homepagePosts && homepagePosts.length > 0 ? (
            homepagePosts.map((post, index) => (
              // Wrap each Post component in a div to handle the ref for infinite scrolling
              <div
                key={post._id || index}
                ref={index === homepagePosts.length - 1 ? lastPostRef : null} // Add the ref to the last post
              >
                <Post post={post} currentUserEmail={user?.email} /> 
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Homepage;