import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/HomePage/HomePage";
import ProductsPage from "@pages/ProductsPage/ProductsPage";
import AuthPage from "@pages/AuthPage/AuthPage";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import CategoryPage from "@pages/CategoryPage/CategoryPage";
import { useEffect } from "react";
import "./App.scss";
import { useDispatch } from "react-redux";
import { authenticateUser } from "@slices/authSlice";

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
            console.log(parsedUserData);

            dispatch(authenticateUser(parsedUserData));
        }
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
