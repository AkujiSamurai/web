import React from 'react';
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';
import { Provider } from 'react-redux'
import axios from "axios"
import store from './redux/store';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)