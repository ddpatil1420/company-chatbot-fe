import React from "react";
import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { task } from './app/index.js'

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={task}>
                <App />
            </Provider>
        </BrowserRouter>
    </StrictMode>
);