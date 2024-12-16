const BASE_URL = import.meta.env.VITE_BASE_URL

// auth endpoints
export const authEndpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    LOGOUT_API: BASE_URL + "/auth/logout",
};

// post Endpoints
export const postEndpoints = {
    CREATE_POST_API: BASE_URL + "/post/createPost",
    DELETE_POST_API: BASE_URL + "/post/deletePost",
    EDIT_POST_API: BASE_URL + "/post/editPost",
    HOMEPAGE_POST_API: BASE_URL + "/post/getHomepagePost",
    USER_POST_API: BASE_URL + "/post/getUserPost",
};