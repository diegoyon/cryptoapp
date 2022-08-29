/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ASSETS_URL = 'https://api.coincap.io/v2/assets';

export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async () => {
    const response = await axios.get(ASSETS_URL);
    return response.data.data;
  },
);

export const assets = createSlice({
  name: 'assets',
  initialState: {
    assets: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assets = action.payload;
      });
  },
});

export default assets.reducer;
