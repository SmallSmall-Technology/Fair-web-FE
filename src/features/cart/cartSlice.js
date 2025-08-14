import { v4 as uuidv4 } from 'uuid';
import httpClient from '../../api/http-clients';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/* -------------------- Utility -------------------- */
export const getCartSessionId = () => {
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
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const userID = state.auth.user?.userID;
    const { isAuthenticated } = state.auth;
    const cartSessionID = getCartSessionId();

    try {
      const payload = isAuthenticated ? { userID } : { cartSessionID };

      const response = await httpClient.post('/cart/view-cart', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || 'Failed to fetch cart'
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Retry fetch cart with delay
export const retryFetchCart = createAsyncThunk(
  'cart/retryFetchCart',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Add a 500ms delay to account for potential backend persistence delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await dispatch(fetchCart()).unwrap();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to retry fetch cart');
    }
  }
);

// Add to cart with default payment plan
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product, { getState, dispatch, rejectWithValue }) => {
    const prevCart = [...getState().cart.cart];
    const selectedPaymentPlan = getState().cart.selectedPaymentPlan;

    let paymentOptions = [];
    try {
      paymentOptions = JSON.parse(product.paymentOptionsBreakdown || '[]');
    } catch (error) {}

    // Find the selected payment plan details
    const paymentPlanDetails = paymentOptions.find(
      (option) => option.type === selectedPaymentPlan
    ) || {
      type: selectedPaymentPlan,
      amount: product.fairAppPrice || product.productPrice,
      totalPrice: product.fairAppPrice || product.productPrice,
    };

    const normalizedProduct = {
      ...product,
      quantity: product.quantity || 1,
      paymentOptionsBreakdown: selectedPaymentPlan,
      selectedPaymentPlanDetails: {
        type: selectedPaymentPlan,
        amount: Number(
          paymentPlanDetails.amount ||
            product.fairAppPrice ||
            product.productPrice
        ),
        totalPrice:
          Number(
            paymentPlanDetails.amount ||
              product.fairAppPrice ||
              product.productPrice
          ) * (product.quantity || 1),
      },
      price: Number(
        paymentPlanDetails.amount ||
          product.fairAppPrice ||
          product.productPrice
      ),
      totalPrice:
        Number(
          paymentPlanDetails.amount ||
            product.fairAppPrice ||
            product.productPrice
        ) * (product.quantity || 1),
    };

    // Optimistic update
    dispatch(cartSlice.actions.optimisticAdd(normalizedProduct));

    try {
      const response = await httpClient.post(
        '/cart/add-to-cart',
        {
          productID: product.productID,
          quantity: normalizedProduct.quantity,
          cartSessionID: getCartSessionId(),
          // paymentPlan: selectedPaymentPlan,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers used in Postman
            // 'Authorization': 'Bearer your-token',
          },
        }
      );

      // Sync with backend
      const fetchResult = await dispatch(fetchCart()).unwrap();
      // If fetchCart returns empty, retry once
      if (!fetchResult.data?.cart?.items?.length) {
        await dispatch(retryFetchCart()).unwrap();
      }
      return fetchResult;
    } catch (error) {
      dispatch(cartSlice.actions.rollback(prevCart));
      return rejectWithValue(error.message || 'Failed to add to cart');
    }
  }
);

// Remove item
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ productID }, { dispatch, rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        '/cart/remove-from-cart',
        {
          productID,
          cartSessionID: getCartSessionId(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

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

// Update item quantity
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

      // Refresh the cart after update
      dispatch(fetchCart());

      // return response.data;
      // ✅ Preserve selectedPaymentPlan locally even if API doesn't return it
      return {
        ...response.data, // includes updated totals from API
        quantity,
        paymentPlan: existingItem.paymentPlan,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update item');
    }
  }
);

// Update cartitem(s) payment plan
export const updateCartItemPaymentPlan = createAsyncThunk(
  'cart/updateCartItemPaymentPlan',
  async ({ productID, selectedPaymentPlan }, { getState, rejectWithValue }) => {
    const state = getState();
    const existingItem = state.cart.cart.find(
      (item) => item.productID === productID
    );

    if (!existingItem) throw new Error('Item not found in cart');

    try {
      const response = await httpClient.post('/cart/update-payment-plan', {
        productID,
        selectedPaymentPlan,
        cartSessionID: getCartSessionId(),
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || 'Failed to update payment plan'
        );
      }

      return {
        ...response.data,
        productID,
        paymentPlan: selectedPaymentPlan, // ✅ fix is here
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update payment plan');
    }
  }
);

// Transfer guest cart to user cart

export const transferGuestCartToUser = createAsyncThunk(
  'cart/transferGuestCartToUser',
  async (cartSessionID, { dispatch, rejectWithValue }) => {
    try {
      if (!cartSessionID) return rejectWithValue('No cart session ID found');

      const response = await httpClient.post('/cart/transfer-guest-cart', {
        cartSessionID,
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || 'Failed to transfer cart'
        );
      }

      // Remove guest cart session ID after successful transfer
      localStorage.removeItem('cartSessionID');

      // Fetch updated cart for logged-in user
      await dispatch(fetchCart());

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* -------------------- SLICE -------------------- */

const initialState = {
  cart: [],
  status: 'idle',
  error: null,
  selectedPaymentPlan: 'monthly',
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

      const option = paymentMap[plan];
      if (!option) return;

      item.paymentPlanDetails = {
        type: plan,
        amount: Number(option.amount || item.price),
        totalPrice: Number(option.amount || item.price) * (item.quantity || 1),
      };

      item.price = Number(option.amount || item.price);
      item.totalPrice = item.price * (item.quantity || 1);

      // Update summary
      state.cart_summary = {
        total_items: state.cart.length,
        total_quantity: state.cart.reduce(
          (sum, i) => sum + Number(i.quantity || 0),
          0
        ),
        total_amount: state.cart.reduce(
          (sum, i) => sum + Number(i.totalPrice || 0),
          0
        ),
      };
    },

    optimisticAdd: (state, action) => {
      const product = action.payload;
      const existing = state.cart.find(
        (item) => item.productID === product.productID
      );

      if (!existing) {
        // existing.quantity =
        //   Number(existing.quantity || 0) + Number(product.quantity || 1);
        // existing.totalPrice =
        //   Number(existing.price || product.selectedPaymentPlanDetails.amount) *
        //   existing.quantity;
        // toast.warn('Item quantity updated in cart');

        state.cart.push({
          ...product,
          quantity: Number(product.quantity || 1),
          paymentPlan: 'monthly',
          paymentPlanDetails: product.selectedPaymentPlanDetails || {
            type: '',
            amount: Number(product.fairAppPrice || product.productPrice),
            totalPrice:
              Number(product.fairAppPrice || product.productPrice) *
              (product.quantity || 1),
          },
          price: Number(
            product.selectedPaymentPlanDetails.amount ||
              product.fairAppPrice ||
              product.productPrice
          ),
          totalPrice:
            Number(
              product.selectedPaymentPlanDetails.amount ||
                product.fairAppPrice ||
                product.productPrice
            ) * (product.quantity || 1),
        });
      }

      // Update summary
      state.cart_summary = {
        total_items: state.cart.length,
        total_quantity: state.cart.reduce(
          (sum, i) => sum + Number(i.quantity || 0),
          0
        ),
        total_amount: state.cart.reduce(
          (sum, i) => sum + Number(i.totalPrice || 0),
          0
        ),
      };
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
          (sum, i) => sum + Number(i.totalPrice || 0),
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
        const serverSessionID = action.payload.data?.owner?.cartSessionID;
        if (serverSessionID) {
          localStorage.setItem('cartSessionID', serverSessionID);
        }
        if (cartData.items && cartData.items.length > 0) {
          state.cart = cartData.items.map((item) => ({
            ...item,
            paymentPlan: item.selectedPaymentPlan,
            price: Number(item.price || item.fairAppPrice || item.productPrice),
            totalPrice:
              Number(item.price || item.fairAppPrice || item.productPrice) *
              (item.quantity || 1),
          }));
          state.cart_summary = cartData.summary || {
            total_items: 0,
            total_quantity: 0,
            total_amount: 0,
          };
        } else {
          // Clear cart when empty from backend
          state.cart = [];
          state.cart_summary = {
            total_items: 0,
            total_quantity: 0,
            total_amount: 0,
          };
        }
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch cart';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const cartData = action.payload.data?.cart || {};
        if (cartData.items && cartData.items.length > 0) {
          state.cart = cartData.items.map((item) => ({
            ...item,
            paymentPlan: item.paymentPlan,
            price: Number(item.price || item.fairAppPrice || item.productPrice),
            totalPrice:
              Number(item.price || item.fairAppPrice || item.productPrice) *
              (item.quantity || 1),
          }));
          state.cart_summary = cartData.summary || state.cart_summary;
        } else {
          // Retain optimistic state
          state.cart_summary = {
            total_items: state.cart.length,
            total_quantity: state.cart.reduce(
              (sum, i) => sum + Number(i.quantity || 0),
              0
            ),
            total_amount: state.cart.reduce(
              (sum, i) => sum + Number(i.totalPrice || 0),
              0
            ),
          };
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const cartData = action.payload.data?.cart || {};
        state.cart = (cartData.items || []).map((item) => ({
          ...item,
          paymentPlan: item.paymentPlan,
          price: Number(item.price || item.fairAppPrice || item.productPrice),
          totalPrice:
            Number(item.price || item.fairAppPrice || item.productPrice) *
            (item.quantity || 1),
        }));
        state.cart_summary = cartData.summary || state.cart_summary;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;

        state.cart = state.cart.map((item) =>
          item.productID === updatedItem.productID
            ? { ...item, ...updatedItem } // ✅ preserve plan and update quantity
            : item
        );
      })
      .addCase(updateCartItemPaymentPlan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { productID, paymentPlan } = action.payload;

        const item = state.cart.find((item) => item.productID === productID);
        if (item) {
          item.paymentPlan = paymentPlan;
        }
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

// export const getTotalCartQuantity = (state) => {
//   const cart = Array.isArray(state.cart.cart) ? state.cart.cart : [];
//   return cart.length;
// };

export const getTotalCartQuantity = (state) => {
  const cart = Array.isArray(state.cart.cart) ? state.cart.cart : [];
  return cart.reduce((total, item) => total + (item.quantity || 0), 0);
};

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

export const getCurrentQuantityById = (productID) => (state) =>
  state.cart.cart.find((item) => item.productID === productID)?.quantity ?? 0;
export const getSelectedPaymentPlan = (state) => state.cart.selectedPaymentPlan;

export const getExistingCartItemById = (productID) => (state) =>
  state.cart.cart.find((item) => item.productID === productID) || null;

export default cartSlice.reducer;
