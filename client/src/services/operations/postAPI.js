import toast from "react-hot-toast";
import { postEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setHomepagePosts } from "../../redux/slices/postSlice";


// endpoints
const { CREATE_POST_API, DELETE_POST_API, EDIT_POST_API, HOMEPAGE_POST_API, USER_POST_API } = postEndpoints

export function getHomepagePost(token) {
    return async(dispatch) => {
        try {
            const response = await apiConnector("GET", HOMEPAGE_POST_API, null, {
                Authorization: `Bearer ${token}`
            })

            // console.log("HOMEPAGE POST API RESPONSE: ", response?.data?.data?.posts);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const allPosts = response.data.data.posts
            await dispatch(setHomepagePosts(allPosts))

            toast.success("homepage")
        } catch (error) {
            console.log("Error while getting post -> ", error);
            toast.error("Cannot get posts");
        }
    }
}