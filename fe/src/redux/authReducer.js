const defaultState = {
    isLoggedIn: false, username: null, password: null, displayName: null, image: null
}
const authReducer = (state = {...defaultState}, action) => {
    if (action.type === 'logout-success') {
        return defaultState;
    }
    return state;
}
export default authReducer;