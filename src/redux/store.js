import { configureStore } from "@reduxjs/toolkit";
import psychologistsReducer from "./psychologists/slice";

export const store = configureStore({
	reducer: {
		psychologists: psychologistsReducer,
	},
});
