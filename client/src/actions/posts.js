import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api/index';


//GET single post//
export const getPost = (id) => async (dispatch) => {

    // getting the response from the api // 
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(id);

        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }   
};



// GET method //

export const getPosts = (page) => async (dispatch) => {

    // getting the response from the api // 
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }   
};


// SEARCH action //
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};


// POST method //
export const createPost = (post, history) => async (dispatch) => {
    // getting the response from the api //
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

// PATCH method //
export const updatePost = (id, post) => async (dispatch) => {
    // getting the response from the api //
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

// DELETE method //
export const deletePost = (id) => async (dispatch) => {
    // getting the response from the api //
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

// LIKE //
export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    // getting the response from the api //
    try {
        const { data } = await api.likePost(id, user?.token);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);

        dispatch({ type: COMMENT, payload: data });
    } catch (error) {
        console.log(error);
    }
};