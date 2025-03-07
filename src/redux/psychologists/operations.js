import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, limitToFirst, orderByKey, query, startAfter } from "firebase/database";
import { specialistsRef } from "../../firebase";

export const getPsychologists = createAsyncThunk(
	"psychologists/getPsychologists",
	async (_, { getState, rejectWithValue }) => {
		try {
			const { pageSize } = getState().psychologists;

			const firstQuery = query(
				specialistsRef,
				orderByKey(),
				limitToFirst(pageSize),
			);

			const snapshot = await get(firstQuery);

			if (snapshot.exists()) {
				const data = snapshot.val();
				const items = Object.keys(data).map((key) => ({
					id: key,
					...data[key],
				}));

				return {
					items,
					lastKey: items[items.length - 1].id,
					hasMore: items.length === pageSize,
				};
			}

			return { items: [], lastKey: null, hasMore: false };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const getMorePsychologists = createAsyncThunk(
	"psychologists/getMorePsychologists",
	async (_, { getState, rejectWithValue }) => {
		try {
			const { lastKey, pageSize, hasMore } = getState().psychologists;

			if (!hasMore) return { items: [], lastKey: null, hasMore: false };

			const nextQuery = query(
				specialistsRef,
				orderByKey(),
				startAfter(lastKey),
				limitToFirst(pageSize),
			);

			const snapshot = await get(nextQuery);

			if (snapshot.exists()) {
				const data = snapshot.val();
				const items = Object.keys(data).map((key) => ({
					id: key,
					...data[key],
				}));

				return {
					items,
					lastKey: items[items.length - 1].id,
					hasMore: items.length === pageSize,
				};
			}

			return { items: [], lastKey: null, hasMore: false };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);
