import { createSlice } from "@reduxjs/toolkit";

const initialCategoriesState = {
    mainCategories: [],
    categories: [],
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialCategoriesState,
    reducers: {
        updateMainCategories(state, action) {
            state.mainCategories = action.payload.mainCategories;

            console.log("Main Categories: ", [...state.mainCategories]);
        },
        updateCategories(state, action) {
            state.categories = action.payload.categories;

            console.log("Categories: ", [...state.categories]);
        },
        clearMainCategories(state) {
            state.mainCategories = [];
            console.log("Main Categories have been cleared");
        },
        clearCategories(state) {
            state.categories = [];
            console.log("Categories have been cleared");
        },
    },
});

export const {
    updateMainCategories,
    updateCategories,
    clearMainCategories,
    clearCategories,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
