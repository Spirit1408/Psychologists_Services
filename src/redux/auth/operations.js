import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../../firebase";

const handleAuthError = (error) => {
	const errorCode = error.code;

	switch (errorCode) {
		case "auth/email-already-in-use":
			return "This email is already in use";
		case "auth/invalid-email":
			return "Invalid email format";
		case "auth/weak-password":
			return "Password must contain at least 6 characters";
		case "auth/user-not-found":
			return "User not found";
		case "auth/wrong-password":
			return "Wrong password";
		case "auth/invalid-credential":
			return "Invalid email or/and password";
		default:
			return error.message;
	}
};

export const registerUser = createAsyncThunk(
	"auth/register",
	async (credentials, thunkAPI) => {
		const { name, email, password } = credentials;
		try {
			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);

			const token = await userCredentials.user.getIdToken();

			await updateProfile(userCredentials.user, { displayName: name });

			const userRef = ref(database, `users/${userCredentials.user.uid}`);

			await set(userRef, {
				name,
				email,
				createdAt: new Date().toISOString(),
			});

			return {
				user: {
					name: userCredentials.user.displayName,
					email: userCredentials.user.email,
					uid: userCredentials.user.uid,
				},
				token,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(handleAuthError(error));
		}
	},
);

export const login = createAsyncThunk(
	"auth/login",
	async (credentials, thunkAPI) => {
		const { email, password } = credentials;

		try {
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);

			const token = await userCredentials.user.getIdToken();

			return {
				user: {
					name: userCredentials.user.displayName,
					email: userCredentials.user.email,
					uid: userCredentials.user.uid,
				},
				token,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(handleAuthError(error));
		}
	},
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		await signOut(auth);
		return;
	} catch (error) {
		return thunkAPI.rejectWithValue(handleAuthError(error));
	}
});

export const refreshUser = createAsyncThunk(
	"auth/refreshUser",
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();
		const persistedToken = state.auth.token;

		if (!persistedToken) {
			return thunkAPI.fulfillWithValue(null);
		}

		return new Promise((resolve, reject) => {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				unsubscribe();

				if (user) {
					try {
						const token = await user.getIdToken();

						resolve({
							user: {
								name: user.displayName,
								email: user.email,
								uid: user.uid,
							},
							token,
						});
					} catch (error) {
						reject(handleAuthError(error));
					}
				} else {
					resolve(null);
				}
			});
		}).catch((error) => {
			return thunkAPI.rejectWithValue(error);
		});
	},
);
