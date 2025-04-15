import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProducts } from '../../api';
const productData = fetchAllProducts;

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const filteredProducts = productData.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      return { category, products: filteredProducts };
    } catch (error) {
      return rejectWithValue('Error filtering products');
    }
  }
);

const initialState = {
  productsByCategory: {},
  loading: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        // Added action parameter
        state.loading = 'succeeded';
        state.productsByCategory[action.payload.category] =
          action.payload.products;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        // Added action parameter
        state.loading = 'failed';
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export default productSlice.reducer;

export const getProductsForCategory = (state, category) =>
  state.products.productsByCategory[category] || [];
