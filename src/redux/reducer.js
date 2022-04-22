const initialState = {
    token: '',
    user: {},
    selected: []
};

export const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.payload };
        case "SET_USER":
            return { ...state, user: action.payload };
        case "SET_SELECTED":
            return { ...state, selected: action.payload };
        default:
            return state;
    }
};

