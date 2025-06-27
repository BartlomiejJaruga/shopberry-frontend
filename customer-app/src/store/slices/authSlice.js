import { userRolesENUM } from "@enums";
import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    isAuthGettingLoaded: true,
    isAuthenticated: false,
    userData: {
        email: null,
        firstName: null,
        lastName: null,
        uuid: null,
        userType: userRolesENUM.GUEST,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {
        authenticateUser(state, action) {
            state.isAuthGettingLoaded = true;

            state.isAuthenticated = true;

            state.userData.email = action.payload.email;
            state.userData.firstName = action.payload.firstName;
            state.userData.lastName = action.payload.lastName;
            state.userData.uuid = action.payload.uuid;
            state.userData.userType = action.payload.userType;

            state.isAuthGettingLoaded = false;

            console.log("[AUTH] userData: ", { ...state.userData });
        },
        logoutUser(state) {
            state.isAuthGettingLoaded = true;

            state.isAuthenticated = false;

            state.userData.email = null;
            state.userData.firstName = null;
            state.userData.lastName = null;
            state.userData.uuid = null;
            state.userData.userType = userRolesENUM.GUEST;
        },
        setAuthGettingLoaded(state, action) {
            state.isAuthGettingLoaded = action.payload.isAuthGettingLoaded;
        },
        updateUserNames(state, action) {
            state.userData.firstName = action.payload.firstName;
            state.userData.lastName = action.payload.lastName;
        },
    },
});

export const {
    authenticateUser,
    logoutUser,
    setAuthGettingLoaded,
    updateUserNames,
} = authSlice.actions;
export default authSlice.reducer;
