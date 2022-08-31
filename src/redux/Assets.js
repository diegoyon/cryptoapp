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

export const getAssetHistory = createAsyncThunk(
  'assets/getAssetHistory',
  async (asset) => {
    const response = await axios.get(`${ASSETS_URL}/${asset}/history?interval=d1`);
    return response.data.data.slice(-30);
  },
);

export const assets = createSlice({
  name: 'assets',
  initialState: {
    assets: [],
    assetHistory: [],
    filter: 'top-rated',
    status: 'idle',
    error: null,
  },
  reducers: {
    sortTopRanked(state) {
      state.assets = state.assets.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));
      state.filter = 'top-rated';
    },
    sortHighPrice(state) {
      state.assets = state.assets.sort((a, b) => parseFloat(b.priceUsd) - parseFloat(a.priceUsd));
      state.filter = 'high-price';
    },
    sortLowPrice(state) {
      state.assets = state.assets.sort((a, b) => parseFloat(a.priceUsd) - parseFloat(b.priceUsd));
      state.filter = 'low-price';
    },
    sortGainers(state) {
      state.assets = state.assets.sort((a, b) => parseFloat(b.changePercent24Hr)
        - parseFloat(a.changePercent24Hr));
      state.filter = 'gainers';
    },
    sortLosers(state) {
      state.assets = state.assets.sort((a, b) => parseFloat(a.changePercent24Hr)
        - parseFloat(b.changePercent24Hr));
      state.filter = 'losers';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assets = action.payload;
      })
      .addCase(getAssetHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAssetHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assetHistory = action.payload;
      });
  },
});

export const {
  sortTopRanked,
  sortHighPrice,
  sortLowPrice,
  sortGainers,
  sortLosers,
} = assets.actions;

export default assets.reducer;
