export const setToken = (token) => ({
    type: "SET_TOKEN",
    payload: token
});

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
})

export const setSelected = (selected) => ({
    type: 'SET_SELECTED',
    payload: selected
});