// src/store/accessoriesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action для получения данных об аксессуарах
export const fetchAccessories = createAsyncThunk('accessories/fetchAccessories', async () => {
    const response = await axios.get('https://67d015f4823da0212a848a3b.mockapi.io/bicycle?category=%D0%B0%D0%BA%D1%81%D0%B5%D1%81%D1%81%D1%83%D0%B0%D1%80');
    console.log(response.data);  // Проверьте, что возвращает сервер
    return response.data;
  });
  

// Создаем slice для аксессуаров
const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState: {
    accessories: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccessories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessories = action.payload;
      })
      .addCase(fetchAccessories.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default accessoriesSlice.reducer;
