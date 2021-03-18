import {
    configureStore,
    getDefaultMiddleware,
  } from "@reduxjs/toolkit";

import { todoReducer } from "./reducers/TodoReducer";

export const AppStore = configureStore({
    reducer: {
      todo: todoReducer,
    },
    middleware: getDefaultMiddleware(),
  });