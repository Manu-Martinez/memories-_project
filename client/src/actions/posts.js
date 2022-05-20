import { ReactReduxContext } from 'react-redux';
import * as api from '../api';

// GET action //

export default getPosts = () => async (dispatch) => {

    // getting the response from the api // 
    try {
        const { data } = await api.fetchPosts();

        dispatch ({ type: 'FETCH ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }   
}

