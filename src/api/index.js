import axios from "axios";

export const GET_TODO_API = (email) => {
  return axios.post("http://localhost:8080/getTodo", { email: email });
};
export const ADD_TODO_API = (todoData) => {
  return axios.post("http://localhost:8080/addTodo", todoData);
};

export const EDIT_TODO_API = (todoData) => {
  return axios.put("http://localhost:8080/editTodo", { data: todoData });
};

export const DELETE_TODO_API = (id) => {
  return axios.delete("http://localhost:8080/deleteToDo", { data: { id: id } });
};
