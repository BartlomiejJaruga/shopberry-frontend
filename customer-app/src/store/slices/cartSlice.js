import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addToCart(state, action) {
            state.items.push(action.payload);
            console.log(
                "[CartSlice] Successfully added to the cart product with ID ",
                action.payload.id
            );
            console.log([...state.items]);
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
