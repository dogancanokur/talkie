import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap-override.scss';
import reportWebVitals from './reportWebVitals';
import './i18n';
import App from "./container/App";
import {Provider} from "react-redux";
import {createStore} from "redux";

const loggedInState = {
    isLoggedIn: true, username: 'dogan', password: 'dogan', displayName: 'dogan', image: null
}
const defaultState = {
    isLoggedIn: false, username: null, password: null, displayName: null, image: null
}
const reducer = (state = {...defaultState}, action) => {
    console.warn(action);
    if (action.type === 'logout-success') {
        return defaultState;
    }
    return state;
}
const store = createStore(reducer, loggedInState);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App/></Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
