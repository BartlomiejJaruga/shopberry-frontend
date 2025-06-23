import {
    authenticateUser,
    logoutUser,
    updateUserNames,
} from "@slices/authSlice";

export const authMiddleware = (store) => (next) => (action) => {
    if (authenticateUser.match(action)) {
        const { rememberMe, ...userData } = action.payload;

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

    if (updateUserNames.match(action)) {
        let userData = localStorage.getItem("authenticated_user_data");
        if (userData) {
            const parsed = JSON.parse(userData);
            console.log("Parsed: ", parsed);

            parsed.firstName = action.payload.firstName;
            parsed.lastName = action.payload.lastName;

            console.log("Better parsed: ", parsed);

            localStorage.setItem(
                "authenticated_user_data",
                JSON.stringify(parsed)
            );
        } else {
            userData = sessionStorage.getItem("authenticated_user_data");

            if (userData) {
                const parsed = JSON.parse(userData);
                console.log("Parsed: ", parsed);

                parsed.firstName = action.payload.firstName;
                parsed.lastName = action.payload.lastName;

                console.log("Better parsed: ", parsed);

                sessionStorage.setItem(
                    "authenticated_user_data",
                    JSON.stringify(parsed)
                );
            }
        }
    }

    return next(action);
};
