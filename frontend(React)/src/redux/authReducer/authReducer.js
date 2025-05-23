const initialState = {
    token: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH_TOKEN':
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload
            };
        case 'CLEAR_AUTH_TOKEN':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
};

export default authReducer;