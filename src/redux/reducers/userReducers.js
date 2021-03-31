import { LOGIN, LOGOUT } from '../actions/constants';

const initialState = {
    user: null
}

const userReducer =  (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, user: action.data };
        case LOGOUT:
            return { ...state, user: null };
        default:
            return state;
    }
}
export default userReducer;