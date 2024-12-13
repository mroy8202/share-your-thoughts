import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    postLoading: false,
    homepagePosts: [],
    userPosts: [],
    totalPages: 0
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
        setTotalPages(state, value) {
            state.totalPages = value.payload;
        }
    }
})

export const { setUser, setPostLoading, setHomepagePosts, setUserPosts, setTotalPages } = postSlice.actions;

export default postSlice.reducer;