import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  GET_TODO,
  LOGOUT,
} from "../actions/constants";

const initialState = {
  todoList: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO:
      return { ...state, todoList: action.data };
    case ADD_TODO:
      return { ...state, todoList: [...state.todoList, action.data] };
    case EDIT_TODO:
      return {
        ...state,
        todoList: (() => {
          state.todoList[action.data.index] = action.data.data;
          return state.todoList;
        })(),
      };
    case DELETE_TODO:
      return {
        ...state,
        todoList: (() => {
          state.todoList.splice(action.data, 1);
          return state.todoList;
        })(),
      };

    case LOGOUT:
      return { ...state, todoList: [] };
    default:
      return state;
  }
};
export default todoReducer;
