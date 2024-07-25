import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/api';

// Existing async thunks
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

// New async thunk for fetching product detail
export const fetchProductDetail = createAsyncThunk(
  'products/fetchProductDetail',
  async (id, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.get(`/product/${id}`,{
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

// Existing async thunk for adding a product
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

// Existing async thunk for updating a product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.patch(
        `/product/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
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
    productDetail: null,
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
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
