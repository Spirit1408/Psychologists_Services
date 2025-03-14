import { configureStore } from "@reduxjs/toolkit";
import psychologistsReducer from "./psychologists/slice";
import authReducer from "./auth/slice";
import favoritesReducer from "./favorites/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

const authPersistConfig = {
	key: "auth",
	storage,
	whitelist: ["token"],
};

const favoritesPersistConfig = {
	key: "favorites",
	storage,
	whitelist: ["items", "sortType"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);

export const store = configureStore({
	reducer: {
		psychologists: psychologistsReducer,
		auth: persistedAuthReducer,
		favorites: persistedFavoritesReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
