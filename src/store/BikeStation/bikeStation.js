import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getbikeStation = createAsyncThunk(
  "bikeStation/getbikeStation",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("https://67ea9bd634bcedd95f6406e1.mockapi.io/bikeStation");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

// Срез состояния
const bikeStationSlice = createSlice({
  name: "bikeStation",
  initialState: {
    list: [],
    status: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getbikeStation.pending, (state) => {
        state.status = true;
        state.error = null;
      })
      .addCase(getbikeStation.fulfilled, (state, action) => {
        state.status = false;
        state.list = action.payload; // исправлено здесь
      })
      .addCase(getbikeStation.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload?.message || "Ошибка загрузки данных";
      });
  },
});

export default bikeStationSlice.reducer;

