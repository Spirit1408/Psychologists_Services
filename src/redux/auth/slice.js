import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser, registerUser } from "./operations";

const initialState = {
	user: { name: null, email: null, uid: null },
	token: null,
	isLoggedIn: false,
	isRefreshing: false,
	isLoading: false,
	error: null,
};

const handlePending = (state) => {
	state.isLoading = true;
	state.error = null;
};

const handleError = (state, action) => {
	state.isLoading = false;
	state.error = action.payload;
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, handlePending)
			.addCase(registerUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isLoggedIn = true;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(registerUser.rejected, handleError)

			.addCase(login.pending, handlePending)
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isLoggedIn = true;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(login.rejected, handleError)

			.addCase(logout.pending, handlePending)
			.addCase(logout.fulfilled, (state) => {
				state.user = { name: null, email: null, uid: null };
				state.token = null;
				state.isLoggedIn = false;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(logout.rejected, handleError)

			.addCase(refreshUser.pending, (state) => {
				state.isRefreshing = true;
				state.error = null;
			})
			.addCase(refreshUser.fulfilled, (state, action) => {
				if (!action.payload) {
					state.user = {
						name: null,
						email: null,
						uid: null,
					};
					state.token = null;
					state.isLoggedIn = false;
				} else {
					state.user = action.payload.user;
					state.token = action.payload.token;
					state.isLoggedIn = true;
				}
				state.isRefreshing = false;
				state.error = null;
			})
			.addCase(refreshUser.rejected, (state, action) => {
				state.isRefreshing = false;
				state.error = action.payload;
			});
	},
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
