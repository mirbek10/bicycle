import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEquipment = createAsyncThunk(
  "equipment/getEquipment",
  async (_, thunkapi) => {
    try {
      const res = await axios.get(
        "https://67ea9bd634bcedd95f6406e1.mockapi.io/Equipment"
      );
      return res.data;
    } catch (error) {
      return thunkapi.rejectWithValue({ message: error.message });
    }
  }
);

const equipmentSlice = createSlice({
  name: "equipment",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default equipmentSlice.reducer;
