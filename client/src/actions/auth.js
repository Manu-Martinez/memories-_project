import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {

    // sending the Sign In data to the backend so that it knows the user has signed in  // 
    try {
        const { data } = await api.signIn(formData);

        dispatch ({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }   
}


export const signup = (formData, history) => async (dispatch) => {

    // getting the response from the api // 
    try {
        const { data } = await api.signUp(formData);

        dispatch ({ type: SIGNUP, data });
        history.psuh('/');
    } catch (error) {
        console.log(error);
    }   
}