import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    isAuthenticated: false,
    userData: {
        email: null,
        first_name: null,
        last_name: null,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {
        authenticateUser(state, action) {
            state.isAuthenticated = true;
            state.userData.email = action.payload.email;
            state.userData.first_name = action.payload.first_name;
            state.userData.last_name = action.payload.last_name;
            console.log({ ...state.userData });
        },
        logoutUser(state) {
            state.isAuthenticated = false;
            state.userData.email = null;
            state.userData.first_name = null;
            state.userData.last_name = null;
        },
    },
});

export const { authenticateUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
