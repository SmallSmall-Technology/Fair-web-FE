import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Fetch orders from json-server
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
});

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async ({ cartItems, initialPayment }, { rejectWithValue }) => {
    try {
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newOrder = {
        id: `ORD${Date.now()}`,
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          soldBy: item.soldBy,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount,
        paidAmount: parseFloat(initialPayment),
        remainingAmount: totalAmount - parseFloat(initialPayment),
        status: 'ongoing',
        createdAt: new Date().toISOString(),
        orderDate: new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      };
      const response = await axios.post(`${API_URL}/orders`, newOrder);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const makePayment = createAsyncThunk(
  'order/makePayment',
  async ({ orderId, amount }, { rejectWithValue }) => {
    try {
      const orderResponse = await axios.get(`${API_URL}/orders/${orderId}`);
      const order = orderResponse.data;

      if (order && order.status === 'ongoing') {
        const updatedOrder = {
          ...order,
          paidAmount: order.paidAmount + parseFloat(amount + amount * 7.5),
          remainingAmount:
            order.totalAmount - (order.paidAmount + parseFloat(amount)),
          status:
            order.totalAmount - (order.paidAmount + parseFloat(amount)) <= 0
              ? 'completed'
              : 'ongoing',
        };
        if (updatedOrder.remainingAmount <= 0) {
          updatedOrder.remainingAmount = 0;
        }
        const response = await axios.put(
          `${API_URL}/orders/${orderId}`,
          updatedOrder
        );
        return response.data;
      }
      throw new Error('Order not found or not ongoing');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const orderResponse = await axios.get(`${API_URL}/orders/${orderId}`);
      const order = orderResponse.data;

      if (order && order.status === 'ongoing') {
        const updatedOrder = { ...order, status: 'cancelled' };
        const response = await axios.put(
          `${API_URL}/orders/${orderId}`,
          updatedOrder
        );
        return response.data;
      }
      throw new Error('Order not found or not ongoing');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  orders: [],
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
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.orders[index] = action.payload;
      });
  },
});

export default orderSlice.reducer;

// Memoized Selectors
const selectOrders = (state) => state.order.orders;

export const getOngoingOrders = createSelector([selectOrders], (orders) =>
  (orders || []).filter((order) => order.status === 'ongoing')
);

export const getCompletedOrders = createSelector([selectOrders], (orders) =>
  (orders || []).filter((order) => order.status === 'completed')
);

export const getCancelledOrders = createSelector([selectOrders], (orders) =>
  (orders || []).filter((order) => order.status === 'cancelled')
);

export const getOrderId = (state) => state.order.orders.id;
