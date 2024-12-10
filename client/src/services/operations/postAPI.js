import toast from "react-hot-toast";
import { postEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setHomepagePosts, setPostLoading, setUserPosts } from "../../redux/slices/postSlice";


// endpoints
const { CREATE_POST_API, DELETE_POST_API, EDIT_POST_API, HOMEPAGE_POST_API, USER_POST_API } = postEndpoints

export function getHomepagePost(token) {
    return async(dispatch) => {
        dispatch(setPostLoading(true))
        try {
            const response = await apiConnector("GET", HOMEPAGE_POST_API, null, {
                Authorization: `Bearer ${token}`
            })

            // console.log("HOMEPAGE POST API RESPONSE: ", response?.data?.data.posts);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const allPosts = response.data.data.posts
            await dispatch(setHomepagePosts(allPosts))

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