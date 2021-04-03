import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import userReducers from './userReducers';

const rootReducer = combineReducers({
    userDetails: userReducers,
    todoDetails:todoReducer,
})

export default rootReducer;