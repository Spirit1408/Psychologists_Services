import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, set, remove } from "firebase/database";
import { database } from "../../firebase";

export const getFavorites = createAsyncThunk('favorites/getFavorites', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const userId = state.auth.user.uid;

        if(!userId) {
            return [];
        }

        const favoritesRef = ref(database, `favorites/${userId}`);
        const snapshot = await get(favoritesRef);

        if(snapshot.exists()){
            const favoritesData = snapshot.val();
            return Object.values(favoritesData);
        }

        return [];
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addToFavorites = createAsyncThunk('favorites/addToFavorites', async (psychologist, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const userId = state.auth.user.uid;

        if(!userId) {
            return thunkAPI.rejectWithValue('Unauthorized');
        }

        const favoritesRef = ref(database, `favorites/${userId}/${psychologist.id}`);
        await set(favoritesRef, psychologist);

        return psychologist;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const removeFromFavorites = createAsyncThunk('favorites/removeFromFavorites', async (psychologistId, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const userId = state.auth.user.uid;

        if(!userId) {
            return thunkAPI.rejectWithValue('Unauthorized');
        }

        const favoritesRef = ref(database, `favorites/${userId}/${psychologistId}`);
        await remove(favoritesRef);

        return psychologistId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const clearFavorites = createAsyncThunk(
    "favorites/clearFavorites",
    async (_, thunkAPI) => {
      try {
        const state = thunkAPI.getState();
        const userId = state.auth.user.uid;
        
        if (!userId) {
          return thunkAPI.rejectWithValue("User not authenticated");
        }
        
        const favoritesRef = ref(database, `userFavorites/${userId}`);
        await remove(favoritesRef);
        
        return null;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );