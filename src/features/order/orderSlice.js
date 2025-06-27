import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3002';

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
});

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async ({ cartItems, initialPayment }, { rejectWithValue }) => {
    try {
      // Calculate paid amounts and assign statuses per item
      const itemsWithDetails = cartItems.map((item) => {
        const itemPaidAmount =
          item.paymentPlan === 'upfront'
            ? +item.paymentPlanDetails.amount * item.quantity
            : +initialPayment * item.quantity;
        const itemTotalAmount = +item.paymentPlanDetails.amount * item.quantity;
        return {
          paymentPlan: item.paymentPlan,
          productId: item.productId,
          name: item.name,
          image: item.image,
          soldBy: item.soldBy,
          price: +item.price,
          totalPrice: +item.totalPrice,
          quantity: item.quantity,
          totalAmount: itemTotalAmount,
          paidAmount: itemPaidAmount,
          remainingAmount: itemTotalAmount - itemPaidAmount,
          id: item.id,
          userId: 'user123',
          paymentPlanDetails: item.paymentPlanDetails,
          deliveryDate: item.deliveryDate || 'Jan 20, 2025',
          status: item.paymentPlan === 'upfront' ? 'completed' : 'ongoing',
        };
      });

      const orderPaidAmount = itemsWithDetails.reduce(
        (sum, item) => sum + item.paidAmount,
        0
      );
      const orderTotalAmount = itemsWithDetails.reduce(
        (sum, item) => sum + item.totalAmount,
        0
      );
      const orderRemainingAmount = orderTotalAmount - orderPaidAmount;

      const orderStatus = itemsWithDetails.every(
        (item) => item.status === 'completed'
      )
        ? 'completed'
        : 'ongoing';

      const newOrder = {
        id: `ORD${Date.now()}`,
        items: itemsWithDetails,
        paidAmount: parseFloat(orderPaidAmount.toFixed(2)),
        totalAmount: parseFloat(orderTotalAmount.toFixed(2)),
        remainingAmount: parseFloat(orderRemainingAmount.toFixed(2)),
        status: orderStatus,
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
      console.error('Error creating order:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const makePayment = createAsyncThunk(
  'order/makePayment',
  async ({ orderId, itemId, amount }, { rejectWithValue }) => {
    try {
      const orderResponse = await axios.get(`${API_URL}/orders/${orderId}`);
      const order = orderResponse.data;

      if (!order) {
        throw new Error('Order not found');
      }

      const updatedItems = order.items.map((item) => {
        if (item.id === itemId && item.status === 'ongoing') {
          const newPaidAmount = item.paidAmount + parseFloat(amount);
          const newRemainingAmount = item.totalAmount - newPaidAmount;
          return {
            ...item,
            paidAmount: parseFloat(newPaidAmount.toFixed(2)),
            remainingAmount: parseFloat(
              Math.max(newRemainingAmount, 0).toFixed(2)
            ),
            status: newRemainingAmount <= 0 ? 'completed' : 'ongoing',
          };
        }
        return item;
      });

      const orderPaidAmount = updatedItems.reduce(
        (sum, item) => sum + item.paidAmount,
        0
      );
      const orderRemainingAmount = updatedItems.reduce(
        (sum, item) => sum + item.remainingAmount,
        0
      );
      const orderStatus = updatedItems.every(
        (item) => item.status === 'completed'
      )
        ? 'completed'
        : 'ongoing';

      const updatedOrder = {
        ...order,
        items: updatedItems,
        paidAmount: parseFloat(orderPaidAmount.toFixed(2)),
        remainingAmount: parseFloat(orderRemainingAmount.toFixed(2)),
        status: orderStatus,
      };

      const response = await axios.put(
        `${API_URL}/orders/${orderId}`,
        updatedOrder
      );
      return response.data;
    } catch (error) {
      console.error('Error making payment:', error);
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

const selectOrders = (state) => state.order.orders;

export const getOngoingOrders = createSelector([selectOrders], (orders) =>
  (orders || []).filter(
    (order) => order.status === 'ongoing' && order.paidAmount !== order.price
  )
);

export const getCompletedOrders = createSelector([selectOrders], (orders) =>
  (orders || []).filter(
    (order) =>
      order.status === 'completed' && order.paidAmount === order.totalAmount
  )
);

export const getCancelledOrders = createSelector([selectOrders], (orders) =>
  (orders || []).filter((order) => order.status === 'cancelled')
);

export const getOrderId = (state) => state.order.orders.id;
