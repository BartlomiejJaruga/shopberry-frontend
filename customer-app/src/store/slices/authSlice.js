import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    isAuthenticated: false,
    userData: {
        email: null,
        firstName: null,
        lastName: null,
        uuid: null,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {
        authenticateUser(state, action) {
            state.isAuthenticated = true;

            state.userData.email = action.payload.email;
            state.userData.firstName = action.payload.firstName;
            state.userData.lastName = action.payload.lastName;
            state.userData.uuid = action.payload.uuid;

            console.log({ ...state.userData });
        },
        logoutUser(state) {
            state.isAuthenticated = false;

            state.userData.email = null;
            state.userData.firstName = null;
            state.userData.lastName = null;
            state.userData.uuid = null;
        },
    },
});

export const { authenticateUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
