import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import { getAllOrders } from '../../api/orderAPI';

// Async thunk for fetching orders
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllOrders();

      // ✅ Extract data properly
      return response?.data || {};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

const initialState = {
  orders: [],
  statusCounts: {},
  pagination: {},
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // ✅ Adjusted to match API structure
        state.orders = action.payload.orders || [];
        state.statusCounts = action.payload.status_counts || {};
        state.pagination = action.payload.pagination || {};
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default orderSlice.reducer;

// ----- Selectors -----
const selectOrders = (state) => state.order.orders || [];

// Generic selector factory for orderStatus filtering
const selectOrdersByStatus = (statuses) =>
  createSelector([selectOrders], (orders) =>
    orders.filter((order) => statuses.includes(order.orderStatus))
  );

export const getOngoingOrders = selectOrdersByStatus([
  'direct_debit_in_progress',
  'pending',
  'processing',
]);

export const getCompletedOrders = selectOrdersByStatus([
  'successful',
  'completed',
]);

export const getCancelledOrders = selectOrdersByStatus(['failed', 'cancelled']);

// Extra selectors for convenience
export const getStatusCounts = (state) => state.order.statusCounts;
export const getPagination = (state) => state.order.pagination;
export const getOrderById = (state, orderId) =>
  state.order.orders.find((order) => order.id === orderId);
