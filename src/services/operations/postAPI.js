import toast from "react-hot-toast";
import { postEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setHomepagePosts, setPostLoading, setTotalPages, setUserPosts } from "../../redux/slices/postSlice";


// endpoints
const { CREATE_POST_API, DELETE_POST_API, EDIT_POST_API, HOMEPAGE_POST_API, USER_POST_API } = postEndpoints

export function getHomepagePost(token, pageNo) {
    return async(dispatch, getState) => {
        dispatch(setPostLoading(true))
        try {
            const response = await apiConnector("GET", `${HOMEPAGE_POST_API}?page=${pageNo}&limit=8`, null, {
                Authorization: `Bearer ${token}`
            })

            // console.log("HOMEPAGE POST API RESPONSE: ", response?.data?.data);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const isTotalPageDataAvailable = getState().post.totalPages;
            if(isTotalPageDataAvailable === 0) {
                dispatch(setTotalPages(response?.data?.data?.totalPages))
            }

            const newPosts = response?.data?.data?.posts
            const existingPosts = getState().post.homepagePosts
            const updatedPosts = [...existingPosts, ...newPosts]
            // console.log("updated posts: ", updatedPosts)
            await dispatch(setHomepagePosts(updatedPosts))

            // toast.success("homepage")
        } catch (error) {
            console.log("Error while getting post -> ", error);
            toast.error("Cannot get posts");
        }
        dispatch(setPostLoading(false))
    }
}

export function getUserPost(token) {
    return async(dispatch) => {
        dispatch(setPostLoading(true))
        try {
            const response = await apiConnector("GET", USER_POST_API, null, {
                Authorization: `Bearer ${token}`,
            })

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            const userPost = response.data.data
            // console.log("userPosts: ", userPost)
            dispatch(setUserPosts(userPost))

            // toast.success("Fetched your posts successfully")
        } catch (error) {
            console.log("Error fetching user posts: ", Error)
            toast.error("Failed to fetch posts")
        }
        dispatch(setPostLoading(false))
    }
}

export function composeNewBlog(formData, token, navigate) {
    return async(dispatch) => {
        dispatch(setPostLoading(true))
        try {
            const response = await apiConnector("POST", CREATE_POST_API, formData, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // Set content type to handle files
            })

            // console.log("RESPOSE: ", response)

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Blog submitted");
            navigate("/user/homepage");
        } catch (error) {
            console.log("Error: ", error);
            toast.error("cannot create post");
        }
        dispatch(setPostLoading(false))
    }
}

export function deletePost(postId, token, navigate) {
    return async (dispatch, getState) => {
        dispatch(setPostLoading(true))
        try {
            const response = await apiConnector("DELETE", `${DELETE_POST_API}/${postId}`, null, {
                Authorization: `Bearer ${token}`,
            })

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            // todo: update the user's post, so that the deleted one will not appear
            const { userPosts } = getState().post;
            const updatedUserPosts = userPosts.filter(post => post._id !== postId);
            dispatch(setUserPosts(updatedUserPosts));

            toast.success("Post Deleted Successfully")
            navigate("/user/post")
        } catch (error) {
            console.log("Error -> ", error)
            toast.error("Error while deleting post")
        }
        dispatch(setPostLoading(false))
    }
}

export function editPost(postId, formData, token, navigate) {
    return async (dispatch, getState) => {
        dispatch(setPostLoading(true)); // Start spinner
        try {
            const response = await apiConnector("PUT", `${EDIT_POST_API}/${postId}`, formData, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // Handle file uploads
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const updatedPost = response.data.data; // Assuming updated post is in response.data.data

            // Update the state with the edited post
            const { userPosts } = getState().post;
            const updatedUserPosts = userPosts.map((post) =>
                post._id === postId ? updatedPost : post
            );
            dispatch(setUserPosts(updatedUserPosts));

            toast.success("Post updated successfully");
            navigate("/user/post");
        } catch (error) {
            console.log("Error -> ", error);
            toast.error("Failed to update post");
        }
        dispatch(setPostLoading(false)); // Stop spinner
    };
}

