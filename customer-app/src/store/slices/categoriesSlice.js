import { createSlice } from "@reduxjs/toolkit";

const initialCategoriesState = {
    mainCategories: [],
    categoriesTree: [],
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialCategoriesState,
    reducers: {
        updateMainCategories(state, action) {
            state.mainCategories = action.payload.mainCategories;

            console.log("Main Categories: ", [...state.mainCategories]);
        },
        updateCategoriesTree(state, action) {
            state.categoriesTree = action.payload.categoriesTree;

            console.log("Categories Tree: ", [...state.categoriesTree]);
        },
        clearMainCategories(state) {
            state.mainCategories = [];
            console.log("Main Categories have been cleared");
        },
        clearCategories(state) {
            state.categoriesTree = [];
            console.log("Categories Tree have been cleared");
        },
    },
});

export const {
    updateMainCategories,
    updateCategoriesTree,
    clearMainCategories,
    clearCategories,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
