import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRolesENUM } from "@enums";

export default function SignedUserRoute() {
    const authState = useSelector((state) => state.auth);

    if (authState.isAuthGettingLoaded) {
        return null;
    }

    if (
        !authState ||
        authState.isAuthenticated !== true ||
        authState.userData.userType !== userRolesENUM.CUSTOMER
    ) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
