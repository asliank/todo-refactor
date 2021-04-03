import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  GET_TODO,
  LOGOUT,
} from "./constants";
import {
  GET_TODO_API,
  ADD_TODO_API,
  DELETE_TODO_API,
  EDIT_TODO_API,
} from "../../api";

export const addTodo = (todoData) => {
  return (dispatch) => {
    ADD_TODO_API(todoData).then((res) => {
      return dispatch({ type: ADD_TODO, data: res.data });
    });
  };
};

export const editTodo = (newTodoData) => {
  return (dispatch) => {
    EDIT_TODO_API(newTodoData.data).then((res) => {
      const data = {
        _id: newTodoData.data.id,
        taskName: newTodoData.data.newTaskName,
        taskDescription: newTodoData.data.newTaskDescription,
        taskPriority: newTodoData.data.newTaskPriority,
        email: newTodoData.data.email,
      };
      return dispatch({
        type: EDIT_TODO,
        data: { data: data, index: newTodoData.index },
      });
    });
  };
};

export const deleteTodo = ({ data }) => {
  return (dispatch) => {
    DELETE_TODO_API(data.id).then(() => {
      return dispatch({ type: DELETE_TODO, data: data.index });
    });
  };
};

export const getTodo = (email) => {
  return (dispatch) => {
    GET_TODO_API(email).then((res) => {
      return dispatch({ type: GET_TODO, data: res.data });
    });
  };
};

export const removeAllTodo = () => {
  return (dispatch) => {
    return dispatch({ type: LOGOUT });
  };
};
