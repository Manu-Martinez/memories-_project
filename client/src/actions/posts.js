import * as api from '../api';

// GET method //

export const getPosts = () => async (dispatch) => {

    // getting the response from the api // 
    try {
        const { data } = await api.fetchPosts();

        dispatch ({ type: 'FETCH ALL', payload: data });
    } catch (error) {
        console.log(error);
    }   
}


// POST method //
export const newPost = (post) => async (dispatch) => {
    // getting the response from the api //
    try {
        const { data } = await api.createPost(post);

        dispatch ({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

// PATCH method //
export const updatePost = (id, post) => async (dispatch) => {
    // getting the response from the api //
    try {
        const { data } = await api.updatePost(id, post);

        dispatch ({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

// DELETE method //
export const deletePost = (id) => async (dispatch) => {
    // getting the response from the api //
    try {
        await api.deletePost(id);

        dispatch ({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error);
    }
}