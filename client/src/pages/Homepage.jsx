import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomepagePost } from '../services/operations/postAPI';

const Homepage = () => {
    const dispatch = useDispatch();
    const { token } = useSelector( (state) => state.auth )
    const { homepagePosts } = useSelector( (state) => state.post )

    useEffect( () => {
        dispatch(getHomepagePost(token))
    }, [] )

    useEffect(() => {
        console.log("Homepage Posts: ", homepagePosts)
    }, [])

  return (
    <div>Homepage</div>
  )
}

export default Homepage