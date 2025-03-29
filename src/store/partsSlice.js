// src/store/partsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action для получения данных о запчастях
export const fetchParts = createAsyncThunk('parts/fetchParts', async () => {
  const response = await axios.get('https://67d015f4823da0212a848a3b.mockapi.io/bicycle?category=%D0%B7%D0%B0%D0%BF%D1%87%D0%B0%D1%81%D1%82%D1%8C');
  return response.data;
});

// Создаем slice для запчастей
const partsSlice = createSlice({
  name: 'parts',
  initialState: {
    parts: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchParts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parts = action.payload;
      })
      .addCase(fetchParts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default partsSlice.reducer;
