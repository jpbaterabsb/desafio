import { api } from "./api";

const TODO_PATH = "todos";

export const getTodo = () => {
  return api.get(TODO_PATH);
};

export const addTodo = (todo) => {
  return api.post(TODO_PATH, todo);
};

export const setStatusTodo = (todo) => {
    return api.put(`${TODO_PATH}/${todo.id}`,todo);
};

export const deleteTodo = (id) => {
    return api.delete(`${TODO_PATH}/${id}`);
}
