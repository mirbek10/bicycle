
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBicycles = createAsyncThunk('bike/fetchBicycles', async () => {
  const response = await axios.get('https://67d015f4823da0212a848a3b.mockapi.io/bicycle');
  return response.data;
});

const bikeSlice = createSlice({
  name: 'bike',
  initialState: {
    bicycles: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBicycles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBicycles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bicycles = action.payload;
      })
      .addCase(fetchBicycles.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default bikeSlice.reducer;
