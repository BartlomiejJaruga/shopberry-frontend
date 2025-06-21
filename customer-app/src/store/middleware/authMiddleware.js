import { authenticateUser, logoutUser } from "@slices/authSlice";

export const authMiddleware = (store) => (next) => (action) => {
    if (authenticateUser.match(action)) {
        const { rememberMe, ...userData } = action.payload;

        console.log(rememberMe);
        console.log(userData);
        if (rememberMe) {
            localStorage.setItem(
                "authenticated_user_data",
                JSON.stringify(userData)
            );
        } else {
            sessionStorage.setItem(
                "authenticated_user_data",
                JSON.stringify(userData)
            );
        }
    }

    if (logoutUser.match(action)) {
        localStorage.removeItem("authenticated_user_data");
        sessionStorage.removeItem("authenticated_user_data");
    }

    return next(action);
};
