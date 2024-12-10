import toast from "react-hot-toast";
import { authEndpoints } from "../apis"
import { apiConnector } from "../apiConnector"
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { setUser, setUserPosts } from "../../redux/slices/postSlice";

// endpoints
const { SIGNUP_API, LOGIN_API, LOGOUT_API } = authEndpoints

export function signup({ email, password, confirmPassword }, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {email, password, confirmPassword})

            console.log("SIGNUP API RESPONSE -> ", response )

            if(!response.data.success) {
                throw new Error(response.data.message) // if response if false, an error is thrown with the server's error message.
            }

            toast.success("Signup successfull")
            navigate("/login");
        } catch (error) {
            console.log("SIGNUP API ERROR -> ", error)
            toast.error("Signup failed")
            navigate("/")
        }
        dispatch(setLoading(false))
    }
}

export function login({ email, password }, navigate) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password })

            console.log("Login Api Response -> ", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Logged In");

            await dispatch(setToken(response.data.token))
            await dispatch(setUser(response.data.user))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))

            navigate("/user/homepage")
        } catch (error) {
            console.log("LOGIN_API ERROR -> ", error);
            toast.error("Login failed");
        }
        dispatch(setLoading(false));
    }
}

export function logout(navigate) {
    return async (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(setUserPosts([]));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/login");
    };
}