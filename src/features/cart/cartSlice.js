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
    // console.log('Generated new cartSessionID:', cartSessionID);
  }
  return cartSessionID;
};

/* -------------------- THUNKS -------------------- */

// Fetch cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    const cartSessionID = getCartSessionId();
    // console.log('fetchCart cartSessionID:', cartSessionID);
    try {
      const response = await httpClient.get('/cart/view-cart', {
        params: { cartSessionID },
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers used in Postman, e.g., Authorization or cookies
          // 'Authorization': 'Bearer your-token',
        },
      });
      // console.log('fetchCart response:', response.data);
      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || 'Failed to fetch cart'
        );
      }
      return response.data;
    } catch (error) {
      // console.error('Fetch cart error:', error);
      return rejectWithValue(error.message || 'Failed to fetch cart');
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
      // console.log('Retry fetchCart response:', response);
      return response;
    } catch (error) {
      // console.error('Retry fetch cart error:', error);
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
    // console.log('addToCart cartSessionID:', getCartSessionId());
    // console.log('Adding to cart:', { product, selectedPaymentPlan });

    // Parse paymentOptionsBreakdown from product
    let paymentOptions = [];
    try {
      paymentOptions = JSON.parse(product.paymentOptionsBreakdown || '[]');
    } catch (error) {
      // console.error('Error parsing paymentOptionsBreakdown:', error);
    }

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
    // console.log('Normalized product:', normalizedProduct);

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
      // console.log('Add to cart response:', response.data);

      // Check if backend returned a different payment plan
      if (
        response.data?.data?.product?.selectedPaymentPlan !==
        selectedPaymentPlan
      ) {
        console.warn(
          `Payment plan mismatch: Sent ${selectedPaymentPlan}, received ${response.data.data.product.selectedPaymentPlan}`
        );
      }

      // Sync with backend
      const fetchResult = await dispatch(fetchCart()).unwrap();
      // If fetchCart returns empty, retry once
      if (!fetchResult.data?.cart?.items?.length) {
        // console.warn('Empty cart after add, retrying fetchCart');
        await dispatch(retryFetchCart()).unwrap();
      }
      return fetchResult;
    } catch (error) {
      // console.error('Add to cart error:', error);
      dispatch(cartSlice.actions.rollback(prevCart));
      // toast.error('Failed to add item to cart');
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
            // Add any additional headers used in Postman
          },
        }
      );
      // console.log('Remove from cart response:', response.data);

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || 'Failed to remove item'
        );
      }

      return await dispatch(fetchCart()).unwrap();
    } catch (error) {
      // console.error('Remove from cart error:', error);
      return rejectWithValue(error.message || 'Failed to remove item');
    }
  }
);

// // Update item quantity
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
      // console.error('Update cart item error:', error);
      return rejectWithValue(error.message || 'Failed to update item');
    }
  }
);

// ✅ Update quantity while preserving selectedPaymentPlan
// export const updateCartItem = createAsyncThunk(
//   'cart/updateCartItemQuantity',
//   async ({ productID, quantity }, { getState }) => {
//     const state = getState();
//     const existingItem = state.cart.cart.find(
//       (item) => item.productID === productID
//     );

//     if (!existingItem) throw new Error('Item not found in cart');

//     // ✅ Only send productID and quantity to the endpoint
//     const response = await axios.put('/cart/update-cart-item', {
//       productID,
//       quantity,
//       cartSessionID: getCartSessionId(),
//     });

//     // ✅ Preserve selectedPaymentPlan locally even if API doesn't return it
//     return {
//       ...existingItem,
//       ...response.data, // includes updated totals from API
//       quantity,
//       selectedPaymentPlan: existingItem.selectedPaymentPlan,
//     };
//   }
// );

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

      if (existing) {
        existing.quantity =
          Number(existing.quantity || 0) + Number(product.quantity || 1);
        existing.totalPrice =
          Number(existing.price || product.selectedPaymentPlanDetails.amount) *
          existing.quantity;
        toast.warn('Item quantity updated in cart');
      } else {
        state.cart.push({
          ...product,
          quantity: Number(product.quantity || 1),
          // paymentPlan: product.paymentOptionsBreakdown || product.paymentPlan,
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
        // toast.success('Item added to cart');
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
          // console.log('Synced cartSessionID from server:', serverSessionID);
        }
        if (cartData.items && cartData.items.length > 0) {
          state.cart = cartData.items.map((item) => ({
            ...item,
            paymentPlan: 'monthly' || item.paymentPlan,
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
          // console.warn(
          //   'Empty cart received from backend, retaining current state'
          // );
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
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch cart';
        // console.error('Fetch cart error:', action.payload);
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
          // console.warn(
          //   'Empty cart in addToCart.fulfilled, retaining optimistic state'
          // );
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

export const getTotalCartQuantity = (state) => {
  const cart = Array.isArray(state.cart.cart) ? state.cart.cart : [];
  return cart.length;
};
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

export const getCurrentQuantityById = (productID) => (state) =>
  state.cart.cart.find((item) => item.productID === productID)?.quantity ?? 0;
export const getSelectedPaymentPlan = (state) => state.cart.selectedPaymentPlan;

export default cartSlice.reducer;
