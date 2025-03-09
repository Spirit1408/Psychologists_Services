import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	endBefore,
	get,
	limitToFirst,
	limitToLast,
	orderByChild,
	orderByKey,
	query,
	startAfter,
} from "firebase/database";
import { specialistsRef } from "../../firebase";

const createQueryBySortType = (sortType, pageSize, lastKey = null) => {
	let queryConstraints = [];

	switch (sortType) {
		case "desc": 
			queryConstraints.push(orderByChild("name"));
			queryConstraints.push(limitToFirst(pageSize)); 
			if (lastKey) queryConstraints.push(startAfter(lastKey.value, lastKey.id));
			break;

		case "asc": 
			queryConstraints.push(orderByChild("name"));
			queryConstraints.push(limitToLast(pageSize));
			if (lastKey) queryConstraints.push(endBefore(lastKey.value, lastKey.id)); 
			break;

		case "less":
			queryConstraints.push(orderByChild("price_per_hour"));
			queryConstraints.push(limitToFirst(pageSize));
			if (lastKey) queryConstraints.push(startAfter(lastKey.value, lastKey.id));
			break;
		
		case "more":
			queryConstraints.push(orderByChild("price_per_hour"));
			queryConstraints.push(limitToLast(pageSize));
			if (lastKey) queryConstraints.push(endBefore(lastKey.value, lastKey.id)); 
			break;
		
		case "pop":
			queryConstraints.push(orderByChild("rating"));
			queryConstraints.push(limitToLast(pageSize));
			if (lastKey) queryConstraints.push(endBefore(lastKey.value, lastKey.id));
			break;
		
		case "nopop":
			queryConstraints.push(orderByChild("rating"));
			queryConstraints.push(limitToFirst(pageSize));
			if (lastKey) queryConstraints.push(startAfter(lastKey.value, lastKey.id));
			break;

		case "all":
		default:
			queryConstraints.push(orderByKey());
			queryConstraints.push(limitToFirst(pageSize));
			if (lastKey) queryConstraints.push(startAfter(lastKey));
			break;
	}

	return query(specialistsRef, ...queryConstraints);
};

const processDataBySortType = (data, sortType) => {
	const items = Object.keys(data).map((key) => ({
		id: key,
		...data[key],
	}));

	switch (sortType) {
		case "desc": 
			return items.sort((a, b) => a.name.localeCompare(b.name));
		case "asc": 
			return items.sort((a, b) => a.name.localeCompare(b.name)).reverse();
		case "less": 
			return items.sort((a, b) => a.price_per_hour - b.price_per_hour);
		case "more": 
			return items.sort((a, b) => b.price_per_hour - a.price_per_hour);
		case "pop": 
			return items.sort((a, b) => b.rating - a.rating);
		case "nopop": 
			return items.sort((a, b) => a.rating - b.rating);
		case "all":
		default:
			return items;
	}
};

const getLastKeyBySortType = (items, sortType) => {
	if (!items || items.length === 0) return null;

	const lastItem = items[items.length - 1];

	switch (sortType) {
		case "desc":
		case "asc":
			return { value: lastItem.name, id: lastItem.id };
		case "less":
		case "more":
			return { value: lastItem.price_per_hour, id: lastItem.id };
		case "pop":
		case "nopop":
			return { value: lastItem.rating, id: lastItem.id };
		case "all":
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
