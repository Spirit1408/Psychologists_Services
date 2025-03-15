import { createSlice } from "@reduxjs/toolkit";
import { getFavorites, addToFavorites, removeFromFavorites, clearFavorites } from "./operations";

const initialState = {
    items: [],
    isLoading: false,
    error: null,
    lastKey: null,
    hasMore: true,
    pageSize: 3,
    sortType: "all",
};

const handlePending = (state) => {
    state.isLoading = true;
    state.error = null;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setSortType: (state, action) => {
            state.sortType = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFavorites.pending, handlePending)
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(getFavorites.rejected, (state, action) => {
                handleRejected(state, action);
            })

            .addCase(addToFavorites.pending, handlePending)
            .addCase(addToFavorites.fulfilled, (state, action) => {
                const exists = state.items.some(item => item.id === action.payload.id)
                if (!exists) {
                    state.items.push(action.payload);
                }
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addToFavorites.rejected, handleRejected)
            
            .addCase(removeFromFavorites.pending, handlePending)
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(removeFromFavorites.rejected, handleRejected)
            
            .addCase(clearFavorites.pending, handlePending)
            .addCase(clearFavorites.fulfilled, (state) => {
                state.items = [];
                state.lastKey = null;
                state.hasMore = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(clearFavorites.rejected, handleRejected);
    }
});

export const { setSortType } = favoritesSlice.actions;
export default favoritesSlice.reducer;
