import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/HomePage/HomePage";
import AuthPage from "@pages/AuthPage/AuthPage";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import CategoryPage from "@pages/CategoryPage/CategoryPage";
import SignedUserRoute from "./routes/SignedUserRoute";
import UnauthorizedPage from "@pages/UnauthorizedPage/UnauthorizedPage";
import { useEffect } from "react";
import "./App.scss";
import { useDispatch } from "react-redux";
import { authenticateUser, setAuthGettingLoaded } from "@slices/authSlice";
import UserAccountPage from "@pages/UserAccountPage/UserAccountPage";
import CartPage from "@pages/CartPage/CartPage";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedSessionUserData = sessionStorage.getItem(
            "authenticated_user_data"
        );
        const storedLocalUserData = localStorage.getItem(
            "authenticated_user_data"
        );

        let parsedUserData;
        if (storedLocalUserData) {
            parsedUserData = JSON.parse(storedLocalUserData);
        } else {
            parsedUserData = JSON.parse(storedSessionUserData);
        }

        if (parsedUserData) {
            dispatch(authenticateUser(parsedUserData));
        } else {
            dispatch(setAuthGettingLoaded(false));
        }
    }, [dispatch]);

    return (
        <>
            <Routes>
                {/* Public GUEST routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<NotFoundPage />} />

                {/* Protected CUSTOMER routes */}
                <Route element={<SignedUserRoute />}>
                    <Route path="/account" element={<UserAccountPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
