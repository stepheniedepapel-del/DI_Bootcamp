import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRecipesApi } from '../api/api';
import { DataState, Recipe } from '../types/types';

// Initial state typed with Recipe for this specific slice implementation
const initialState: DataState<Recipe> = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk action to handle the data fetching lifecycles
export const getRecipes = createAsyncThunk(
  'data/getRecipes',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchRecipesApi();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dataSlice.reducer;
