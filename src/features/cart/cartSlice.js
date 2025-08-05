import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpClient from '../../api/http-clients';
import { v4 as uuidv4 } from 'uuid';

/* -------------------- Utility -------------------- */
const getCartSessionId = () => {
  let cartSessionID = localStorage.getItem('cartSessionID');
  if (!cartSessionID) {
    cartSessionID = uuidv4();
    localStorage.setItem('cartSessionID', cartSessionID);
  }
  return cartSessionID;
};

/* -------------------- THUNKS -------------------- */

// Fetch cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const cartSessionID = getCartSessionId();
      const response = await httpClient.get('/cart/view-cart', {
        params: { cartSessionID },
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || 'Failed to fetch cart'
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch cart');
    }
  }
);

// Add to cart with default payment plan
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product, { getState, dispatch, rejectWithValue }) => {
    const prevCart = [...getState().cart.cart];

    // Default to full payment if user didn't pick one
    // const selectedPaymentPlan = product.paymentPlan || 'full';
    const selectedPaymentPlan = product.paymentOptionsBreakdown.filter(
      (paymentPlan) => paymentPlan.type === option.type || 'full'
    );

    const normalizedProduct = {
      ...product,
      quantity: product.quantity || 1,
      paymentOptionsBreakdown: selectedPaymentPlan,
      selectedPaymentPlanDetails: {
        type: selectedPaymentPlan,
        amount: product.price,
        totalPrice: product.price * (product.quantity || 1),
      },
    };
    console.log(normalizedProduct);

    // Optimistic update
    dispatch(cartSlice.actions.optimisticAdd(normalizedProduct));

    try {
      // Send to backend
      await httpClient.post('/cart/add-to-cart', {
        productID: product.productID,
        quantity: normalizedProduct.quantity,
        cartSessionID: getCartSessionId(),
        paymentPlan: selectedPaymentPlan,
      });

      // Sync with backend
      return await dispatch(fetchCart()).unwrap();
    } catch (error) {
      // Rollback on failure
      dispatch(cartSlice.actions.rollback(prevCart));
      toast.error('Failed to add item to cart');
      return rejectWithValue(error.message || 'Failed to add to cart');
    }
  }
);

// Remove item
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ productID }, { dispatch, rejectWithValue }) => {
    try {
      const response = await httpClient.post('/cart/remove-from-cart', {
        productID,
        cartSessionID: getCartSessionId(),
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || 'Failed to remove item'
        );
      }

      return await dispatch(fetchCart()).unwrap();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to remove item');
    }
  }
);

// //  --- Update item quantity ---
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async (
    { productID, cartSessionID, quantity },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await httpClient.post('/cart/update-cart-item', {
        productID,
        cartSessionID,
        quantity,
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || 'Failed to update item'
        );
      }

      // Option 1: Refresh the cart after update
      dispatch(fetchCart());

      return response.data;
    } catch (error) {
      console.error('Update cart item failed:', error);
      return rejectWithValue(error.message || 'Failed to update item');
    }
  }
);

/* -------------------- SLICE -------------------- */

const initialState = {
  cart: [],
  status: 'idle',
  error: null,
  selectedPaymentPlan: 'full',
  cart_summary: { total_items: 0, total_quantity: 0, total_amount: 0 },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setSelectedPaymentPlan: (state, action) => {
      state.selectedPaymentPlan = action.payload;
    },

    setItemPaymentPlan: (state, action) => {
      const { productID, plan, paymentOptions } = action.payload;
      const item = state.cart.find((i) => i.productID === productID);
      if (!item || item.paymentPlan === plan) return;

      item.paymentPlan = plan;

      const paymentMap = {};
      for (const option of paymentOptions) {
        if (option.type) paymentMap[option.type] = option;
      }

      const option = paymentMap[plan] || paymentMap.full;
      if (!option) return;

      item.paymentPlanDetails = {
        type: plan,
        amount: option.amount ?? item.price,
        totalPrice: (option.totalPrice ?? item.price) * (item.quantity || 1),
      };

      item.price = option.amount ?? item.price;
      item.totalPrice = item.price * (item.quantity || 1);

      // Update summary
      state.cart_summary = {
        total_items: state.cart.length,
        total_quantity: state.cart.reduce(
          (sum, i) => sum + Number(i.quantity || 0),
          0
        ),
        total_amount: state.cart.reduce(
          (sum, i) => sum + Number(i.totalPrice || i.price * (i.quantity || 1)),
          0
        ),
      };
    },

    optimisticAdd: (state, action) => {
      const product = action.payload;
      const existing = state.cart.find(
        (item) => item.productID === product.productID
      );

      if (existing) {
        existing.quantity += 1;
        existing.totalPrice += Number(product.price || 0);
      } else {
        state.cart.push({
          ...product,
          quantity: 1,
          paymentPlan: product.paymentPlan || 'full',
          paymentPlanDetails: {
            type: 'full',
            amount: product.price,
            totalPrice: product.price,
          },
          totalPrice: product.price,
        });
      }

      // Update summary
      state.cart_summary.total_items = state.cart.length;
      state.cart_summary.total_quantity += 1;
      state.cart_summary.total_amount += Number(product.price || 0);
    },

    rollback: (state, action) => {
      state.cart = action.payload;
      state.cart_summary = {
        total_items: state.cart.length,
        total_quantity: state.cart.reduce(
          (sum, i) => sum + Number(i.quantity || 0),
          0
        ),
        total_amount: state.cart.reduce(
          (sum, i) => sum + Number(i.totalPrice || i.price * (i.quantity || 1)),
          0
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const cartData = action.payload.data?.cart || {};
        state.cart = (cartData.items || []).map((item) => ({
          ...item,
          paymentPlan: item.paymentPlan || 'full', // Default to full if missing
        }));
        state.cart_summary = cartData.summary || {
          total_items: 0,
          total_quantity: 0,
          total_amount: 0,
        };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch cart';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const cartData = action.payload.data?.cart || {};
        state.cart = (cartData.items || []).map((item) => ({
          ...item,
          paymentPlan: item.paymentPlan || 'full', // Ensure default
        }));
        state.cart_summary = cartData.summary || state.cart_summary;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const cartData = action.payload.data?.cart || {};
        state.cart = (cartData.items || []).map((item) => ({
          ...item,
          paymentPlan: item.paymentPlan || 'full', // Ensure default
        }));
        state.cart_summary = cartData.summary || state.cart_summary;
      });
  },
});

export const {
  setSelectedPaymentPlan,
  setItemPaymentPlan,
  optimisticAdd,
  rollback,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;
export const getCartSummary = (state) => state.cart.cart_summary;

export default cartSlice.reducer;

// export const { optimisticAdd, optimisticRemove, rollback } = cartSlice.actions;

// /* -------------------- SELECTORS -------------------- */
// export const getCart = (state) => state.cart.cart;

// export const getCartSummary = (state) => state.cart.cart_summary;

export const getTotalCartQuantity = (state) => {
  const cart = Array.isArray(state.cart.cart) ? state.cart.cart : [];
  return cart.length;
};
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + (item.total || 0), 0);

export const getCurrentQuantityById = (productID) => (state) =>
  state.cart.cart.find((item) => item.productID === productID)?.quantity ?? 0;
export const getSelectedPaymentPlan = (state) => state.cart.selectedPaymentPlan;
// export default cartSlice.reducer;

// /* -------------------- ACTIONS -------------------- */
