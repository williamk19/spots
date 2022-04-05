const initialState = {
    token: '',
};

export const setToken = (state = initialState, action = {}) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.payload };
        default:
            return state;
    }
};

