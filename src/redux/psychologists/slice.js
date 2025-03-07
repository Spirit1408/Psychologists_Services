import { createSlice } from "@reduxjs/toolkit";
import { getMorePsychologists, getPsychologists } from "./operations";

const initialState = {
	items: [],
	isLoading: false,
	error: null,
	lastKey: null,
	hasMore: true,
	pageSize: 3,
};

const psychologistsSlice = createSlice({
	name: "psychologists",
	initialState,
	reducers: {
		clearPsychologists: (state) => {
			state.items = [];
			state.error = null;
			state.lastKey = null;
			state.hasMore = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPsychologists.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getPsychologists.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload.items;
				state.lastKey = action.payload.lastKey;
				state.hasMore = action.payload.hasMore;
			})
			.addCase(getPsychologists.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(getMorePsychologists.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getMorePsychologists.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = state.items.concat(action.payload.items);
				state.lastKey = action.payload.lastKey;
				state.hasMore = action.payload.hasMore;
			})
			.addCase(getMorePsychologists.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { clearPsychologists } = psychologistsSlice.actions;
export default psychologistsSlice.reducer;