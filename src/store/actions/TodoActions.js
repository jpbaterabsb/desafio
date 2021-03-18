import { createAction } from "@reduxjs/toolkit";
import * as api from "../../services/TodoService";

export const addTodo = createAction("addTodo");
export const setStatusTodo = createAction("setStatusTodo");
export const deleteTodo = createAction("deleteTodo");
export const listTodo = createAction("listTodo");
export const setError = createAction("error");
export const setLoading = createAction("loading");

export const persistTodo = (todo) => async (
    dispatch
) => {
    dispatch(setError(""));
    dispatch(setLoading(true));
    api.addTodo(todo)
        .then(response => dispatch(addTodo(response.data)))
        .catch(e => dispatch(setError(e.message)))
        .finally(() => dispatch(setLoading(false)))
};

export const checkTodo = (todo) =>
    dispatch => {
        dispatch(setError(""));
        dispatch(setLoading(true));
        api.setStatusTodo(todo)
        .then(response => dispatch(setStatusTodo(todo)))
        .catch(e => dispatch(setError(e.message)))
        .finally(() => dispatch(setLoading(false)))
};

export const excludeTodo = (id) =>
    dispatch => {
        dispatch(setError(""));
        dispatch(setLoading(true));
        api.deleteTodo(id)
        .then(_ => dispatch(deleteTodo(id)))
        .catch(e => dispatch(setError(e.message)))
        .finally(() => dispatch(setLoading(false)))
};

export const getAll = () =>
    dispatch => {
        dispatch(setError(""));
        dispatch(setLoading(true));
        api.getTodo()
        .then(response => dispatch(listTodo(response.data)))
        .catch(e => dispatch(setError(e.message)))
        .finally(() => dispatch(setLoading(false)))
};
