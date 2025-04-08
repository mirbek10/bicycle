
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchAccessories = createAsyncThunk('accessories/fetchAccessories', async () => {
    const response = await axios.get('https://67d015f4823da0212a848a3b.mockapi.io/bicycleProduct?category=%D0%B0%D0%BA%D1%81%D0%B5%D1%81%D1%81%D1%83%D0%B0%D1%80');
    return response.data;
  });
  

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
