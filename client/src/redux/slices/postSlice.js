import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    postLoading: false,
    homepagePosts: [],
    userPosts: [],
};

// create slice
const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setPostLoading(state, value) {
            state.postLoading = value.payload;
        },
        setHomepagePosts(state, value) {
            state.homepagePosts = value.payload;
        },
        setUserPosts(state, value) {
            state.userPosts = value.payload;
        },
    }
})

export const { setUser, setLoading, setHomepagePosts, setUserPosts } = postSlice.actions;
export default postSlice.reducer;