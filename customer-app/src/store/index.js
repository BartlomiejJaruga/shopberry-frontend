import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@slices/cartSlice";
import authReducer from "@slices/authSlice";
import categoriesReducer from "@slices/categoriesSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        categories: categoriesReducer,
    },
});
