import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items: [],
    totalCartPrice: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.productId === newItem.productId
            );

            const addedValue = newItem.productPrice * newItem.productCount;

            if (existingItem) {
                existingItem.productCount += newItem.productCount;
                console.log(
                    `[CartSlice] Increased count of product ID ${newItem.productId} to ${existingItem.productCount}`
                );
            } else {
                state.items.push(newItem);
                console.log(
                    `[CartSlice] Added new product to cart: ID ${newItem.productId}`
                );
            }

            state.totalCartPrice += addedValue;

            console.log(JSON.parse(JSON.stringify(state)));
        },

        clearCart(state) {
            state.items = [];
            state.totalCartPrice = 0;
        },
    },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
