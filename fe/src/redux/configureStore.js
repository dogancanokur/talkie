import {createStore} from "redux";
import authReducer from "./authReducer";

const loggedInState = {
    isLoggedIn: true, username: 'dogan', password: 'dogan', displayName: 'dogan', image: null
}

const configureStore = () => {
    let reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    return createStore(authReducer, loggedInState, reduxDevTool)
};

export default configureStore;