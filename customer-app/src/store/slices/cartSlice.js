import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart(state, action) {
            state.items.push(action.payload);
            console.log("[CartSlice] Successfully added to the cart product with ID ", action.payload.id);
            console.log([...state.items]);
        },
        clearCart(state) {
            state.items = [];
        }
    }
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;