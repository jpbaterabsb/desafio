import { createReducer } from "@reduxjs/toolkit";
import {
    addTodo,
    setStatusTodo,
    setError,
    setLoading,
    listTodo,
    deleteTodo
} from "../actions/TodoActions";

export const initialState = {
    todolist: [],
    loading: false,
    error: "",
};

export const todoReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addTodo, (state, { payload }) => {
            state.todolist.push(payload);
        })
        .addCase(setStatusTodo, (state, { payload }) => {
            const currentIndex = state.todolist.findIndex(t => t.id === payload.id);
            state.todolist[currentIndex] = payload;
        })
        .addCase(setLoading, (state, { payload }) => {
            state.loading = payload;
        })
        .addCase(setError, (state, { payload }) => {
            state.error = payload;
        })
        .addCase(deleteTodo, (state, { payload }) => {
            const currentIndex = state.todolist.findIndex(t => t.id === payload);
            state.todolist.splice(currentIndex, 1);
        })
        .addCase(listTodo, (state, { payload }) => {
            state.todolist = payload;
        });
});
