import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	get,
	limitToFirst,
	orderByChild,
	orderByKey,
	query,
	startAfter,
} from "firebase/database";
import { specialistsRef } from "../../firebase";

// Helper function to create the appropriate query based on sort type
const createQueryBySortType = (sortType, pageSize, lastKey = null) => {
	let queryConstraints = [limitToFirst(pageSize)];

	switch (sortType) {
		case "desc": // A to Z (name descending)
			queryConstraints.unshift(orderByChild("name"));
			break;
		case "asc": // Z to A (name ascending)
			queryConstraints.unshift(orderByChild("name"));
			break;
		case "less": // Price descending
		case "more": // Price ascending
			queryConstraints.unshift(orderByChild("price_per_hour"));
			break;
		case "pop": // Popular (rating descending)
		case "nopop": // Not popular (rating ascending)
			queryConstraints.unshift(orderByChild("rating"));
			break;
		case "all": // No sorting (by id)
		default:
			queryConstraints.unshift(orderByKey());
			break;
	}

	// Add startAfter constraint if lastKey is provided
	if (lastKey) {
		queryConstraints.splice(1, 0, startAfter(lastKey));
	}

	return query(specialistsRef, ...queryConstraints);
};

// Helper function to process and sort data based on sort type
const processDataBySortType = (data, sortType) => {
	const items = Object.keys(data).map((key) => ({
		id: key,
		...data[key],
	}));

	// Apply client-side sorting based on sortType
	switch (sortType) {
		case "desc": // A to Z (name descending)
			return items.sort((a, b) => a.name.localeCompare(b.name));
		case "asc": // Z to A (name ascending)
			return items.sort((a, b) => b.name.localeCompare(a.name));
		case "less": // Price descending
			return items.sort((a, b) => b.price_per_hour - a.price_per_hour);
		case "more": // Price ascending
			return items.sort((a, b) => a.price_per_hour - b.price_per_hour);
		case "pop": // Popular (rating descending)
			return items.sort((a, b) => b.rating - a.rating);
		case "nopop": // Not popular (rating ascending)
			return items.sort((a, b) => a.rating - b.rating);
		case "all": // No sorting (by id)
		default:
			return items;
	}
};

// Helper function to get the appropriate last key for pagination
const getLastKeyBySortType = (items, sortType) => {
	if (items.length === 0) return null;

	const lastItem = items[items.length - 1];

	switch (sortType) {
		case "desc": // A to Z
		case "asc": // Z to A
			return lastItem.name;
		case "less": // Price descending
		case "more": // Price ascending
			return lastItem.price_per_hour;
		case "pop": // Popular
		case "nopop": // Not popular
			return lastItem.rating;
		case "all": // No sorting
		default:
			return lastItem.id;
	}
};

export const getPsychologists = createAsyncThunk(
	"psychologists/getPsychologists",
	async (_, { getState, rejectWithValue }) => {
		try {
			const { pageSize, sortType } = getState().psychologists;
			const queryRef = createQueryBySortType(sortType, pageSize);
			const snapshot = await get(queryRef);

			if (snapshot.exists()) {
				const data = snapshot.val();
				const items = processDataBySortType(data, sortType);
				const lastKey = getLastKeyBySortType(items, sortType);

				return {
					items,
					lastKey,
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
			const { lastKey, pageSize, hasMore, sortType } = getState().psychologists;

			if (!hasMore) return { items: [], lastKey: null, hasMore: false };

			const queryRef = createQueryBySortType(sortType, pageSize, lastKey);
			const snapshot = await get(queryRef);

			if (snapshot.exists()) {
				const data = snapshot.val();
				const items = processDataBySortType(data, sortType);
				const newLastKey = getLastKeyBySortType(items, sortType);

				return {
					items,
					lastKey: newLastKey,
					hasMore: items.length === pageSize,
				};
			}

			return { items: [], lastKey: null, hasMore: false };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);
