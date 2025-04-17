import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://67d015e8823da0212a8489ea.mockapi.io/api/products/clothes';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchSingleProduct = createAsyncThunk('products/fetchSingleProduct', async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProduct: null,
    showAll: false,
    status: 'idle',
  },
  reducers: {
    toggleShowAll(state) {
      state.showAll = !state.showAll;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = 'loading';
        state.selectedProduct = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state) => {
        state.status = 'failed';
        state.selectedProduct = null;
      });
  },
});

export const { toggleShowAll } = productSlice.actions;

export default productSlice.reducer;
