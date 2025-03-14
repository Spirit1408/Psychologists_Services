import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    isLoading: false,
    error: null,
    lastKey: null,
    hasMore: true,
    pageSize: 3,
    sortType: "all",
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const exists = state.items.some(item => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
            }
        },
        removeFromFavorites: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearFavorites: (state) => {
            state.items = [];
            state.error = null;
            state.lastKey = null;
            state.hasMore = true;
        },
        setSortType: (state, action) => {
            state.sortType = action.payload;
        }
    }
});

export const { addToFavorites, removeFromFavorites, clearFavorites, setSortType } = favoritesSlice.actions;
export default favoritesSlice.reducer;
