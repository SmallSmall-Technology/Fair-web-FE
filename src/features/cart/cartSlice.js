import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../../api/http-clients';

// 🔹 Get userID dynamically from Redux state
const getUserId = (getState) => getState().auth.user?.userID || null;
console.log(getUserId);
/* -------------------- THUNKS (Async Actions) -------------------- */

/**
 * Fetch all cart items for a user
 */
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await httpClient.get(`/cart?userId=${getUserId}`);
  // Normalize response data for consistent shape in the store
  return response.data.map((item) => ({
    id: item.id,
    image: item.image,
    name: item.name,
    userId: item.userId,
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
    totalPrice: item.totalPrice,
    paymentPlan: item.paymentPlan,
    paymentPlanDetails: item.paymentPlanDetails,
    deliveryDate: item.deliveryDate,
    interest: item.interest,
  }));
});

/**
 * Add a new product to the cart
 * - Checks if the item exists
 * - Calculates price based on selected payment plan
 * - Posts the item to the backend
 */
export const addItem = createAsyncThunk(
  'cart/addItem',
  async (product, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userID = getUserId(getState);
      if (!userID) throw new Error('User not authenticated');

      const selectedPaymentPlan = state.cart.selectedPaymentPlan || 'full';

      // Prevent duplicate
      const exists = state.cart.cart.find(
        (item) => item.productId === product.id
      );
      if (exists) {
        toast.error('Item already in cart');
        return rejectWithValue('Item already in cart');
      }

      // Build paymentMap
      const paymentMap = {};
      product.paymentOptions.forEach((opt) => {
        if (opt.type) paymentMap[opt.type] = opt;
      });

      const selectedOption = paymentMap[selectedPaymentPlan] || paymentMap.full;
      if (!selectedOption) throw new Error('Payment option not available');

      // Compute price
      const quantity = 1;
      const price =
        selectedOption.dailyPayment ||
        selectedOption.weeklyPayment ||
        selectedOption.monthlyPayment ||
        selectedOption.amount ||
        product.price;

      const cartItem = {
        id: product.id,
        category: product.category,
        image: product.coverImage,
        name: product.productName,
        userId: getUserId,
        productId: product.productID,
        quantity,
        price: Number(price),
        totalPrice: Number(price) * quantity,
        paymentPlan: selectedPaymentPlan,
        paymentPlanDetails: selectedOption,
        deliveryDate: product.deliveryDate || 'Jan, 20 2025',
        interest: selectedOption.interest || 0,
      };

      const response = await httpClient.post(
        '/orders/create-mono-order-mandate',
        cartItem
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Remove a cart item by ID
 */
export const removeItem = createAsyncThunk(
  'cart/removeItem',
  async (id, { rejectWithValue }) => {
    try {
      await httpClient.delete(`/orders/create-mono-order-mandate/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Increase item quantity by 1
 */
export const increaseItemQuantity = createAsyncThunk(
  'cart/increaseItemQuantity',
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const item = state.cart.cart.find((item) => item.id === id);
      if (!item) throw new Error('Item not found');

      const updatedItem = {
        ...item,
        quantity: item.quantity + 1,
        totalPrice: (item.quantity + 1) * item.price,
      };

      const response = await httpClient.post(
        `/orders/create-mono-order-mandate/${id}`,
        updatedItem
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Decrease item quantity by 1
 * - Prevents quantity from going below 1
 */
export const decreaseItemQuantity = createAsyncThunk(
  'cart/decreaseItemQuantity',
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const item = state.cart.cart.find((item) => item.id === id);
      if (!item || item.quantity <= 1)
        throw new Error('Cannot decrease quantity below 1');

      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
        totalPrice: (item.quantity - 1) * item.price,
      };

      const response = await httpClient.post(
        `/orders/create-mono-order-mandate/${id}`,
        updatedItem
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Clear all cart items for the user
 */
export const clearCart = createAsyncThunk(
  'orders/create-mono-order-mandate/clearCart',
  async () => {
    const response = await httpClient.get(
      `/orders/create-mono-order-mandate?userId=${getUserId}`
    );
    const cartItems = response.data;

    // Delete all items concurrently
    await Promise.all(
      cartItems.map((item) =>
        httpClient.delete(`/orders/create-mono-order-mandate/${item.id}`)
      )
    );
    return [];
  }
);

/* -------------------- SLICE -------------------- */

const initialState = {
  cart: [], // Array of cart items
  status: 'idle', // idle | loading | succeeded | failed
  error: null, // For error messages
  selectedPaymentPlan: 'full', // Default plan
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Set the current selected payment plan for adding items
     */
    setSelectedPaymentPlan: (state, action) => {
      state.selectedPaymentPlan = action.payload;
    },

    /**
     * Update a specific item's payment plan and recalculate totals
     */
    setItemPaymentPlan: (state, action) => {
      const { id, plan, paymentOptions } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (!item || item.paymentPlan === plan) return;

      item.paymentPlan = plan;

      // Build payment plan lookup
      const paymentMap = {};
      for (const option of paymentOptions) {
        if (option.type) paymentMap[option.type] = option;
      }

      const option = paymentMap[plan] || paymentMap.full;
      if (!option) return;

      // Update payment plan details and recalculate price
      item.paymentPlanDetails = {
        type: plan,
        amount: option.amount ?? item.price,
        months: option.months ?? 0,
        monthlyPayment: option.monthlyPayment ?? 0,
        weeks: option.weeks ?? 0,
        weeklyPayment: option.weeklyPayment ?? 0,
        days: option.days ?? 0,
        dailyPayment: option.dailyPayment ?? 0,
        totalPrice: option.totalPrice ?? item.price,
        fullPayment: option.fullPayment ?? 0,
      };

      let price = 0;
      if (plan === 'full') price = option.amount ?? item.price;
      else if (plan === 'monthly') price = option.monthlyPayment ?? 0;
      else if (plan === 'weekly') price = option.weeklyPayment ?? 0;
      else if (plan === 'daily') price = option.dailyPayment ?? 0;

      item.price = price;
      item.totalPrice = price * (item.quantity || 1);
      item.interest = option.interest ?? 0;

      delete item.paymentOptions;
    },
  },

  /* -------------------- Extra Reducers for Async Thunks -------------------- */
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = 'succeeded';
      })
      // Add Item
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && action.payload.quantity) {
          state.cart.push(action.payload);
        }
      })
      .addCase(addItem.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload || 'Failed to add item', {
          className:
            'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
          bodyClassName: 'm-0 p-0',
          closeButton: false,
        });
      })
      // Remove Item
      .addCase(removeItem.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      // Increase Quantity
      .addCase(increaseItemQuantity.fulfilled, (state, action) => {
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.cart[index] = action.payload;
      })
      // Decrease Quantity
      .addCase(decreaseItemQuantity.fulfilled, (state, action) => {
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.cart[index] = action.payload;
      })
      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = [];
      });
  },
});

export default cartSlice.reducer;

/* -------------------- SELECTORS -------------------- */
export const getCart = (state) => state.cart.cart;
export const getTotalCartQuantity = (state) =>
  (state.cart.cart || []).reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.productId === id)?.quantity ?? 0;
export const getSelectedPaymentPlan = (state) => state.cart.selectedPaymentPlan;

/* -------------------- ACTIONS -------------------- */
export const { setSelectedPaymentPlan, setItemPaymentPlan } = cartSlice.actions;
