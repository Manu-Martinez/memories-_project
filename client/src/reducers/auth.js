import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data })); // saving data in localStorage so the browser will know you are still logged in //
            return { ...state, authData:action?.data  };
        default:
            return state;
    }
};

export default authReducer;