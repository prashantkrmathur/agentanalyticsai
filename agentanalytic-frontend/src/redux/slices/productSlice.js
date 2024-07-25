import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/api';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/product/all');
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.post('/product/add', product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productSlice.reducer;
