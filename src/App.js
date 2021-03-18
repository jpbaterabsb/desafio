import React from 'react';
import Todo from './components/Todo';
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppStore } from "./store";

function App() {
    return (
        <Provider store={AppStore}>
            <ToastContainer autoClose={3000} />
            <Todo />
        </Provider>
    );
}

export default App;