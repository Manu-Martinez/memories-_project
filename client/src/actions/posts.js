import * as api from '../api';

// GET method //

export const getPosts = () => async (dispatch) => {

    // getting the response from the api // 
    try {
        const { data } = await api.fetchPosts();

        dispatch ({ type: 'FETCH ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }   
}


// POST method //
export const newPost = (post) => async (dispatch) => {
    // getting the response from the api //
    try {
        const { data } = await api.createPost(post);

        dispatch ({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}