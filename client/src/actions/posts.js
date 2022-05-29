import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL} from '../constants/actionTypes';
import * as api from '../api/index';

// GET method //

export const getPosts = () => async (dispatch) => {

    // getting the response from the api // 
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }   
};


// SEARCH action //
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data } = await.api.fetchPostsBySearch(searchQuery);

        console.log(data);
    } catch (error) {
        console.log(error);
    }
};


// POST method //
export const createPost = (post) => async (dispatch) => {
    // getting the response from the api //
    try {
        const { data } = await api.createPost(post);

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
