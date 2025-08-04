// import { toast } from 'react-toastify';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import httpClient from '../../api/http-clients';
// import { useSelector } from 'react-redux';

// import { v4 as uuidv4 } from 'uuid';
// import { getUserId } from '../auth/authSlice';
// import { usePaymentOptions } from '../../hooks/usePaymentOptions';
// // import { fetchCartItems } from '../../api/product-api';

// // Utility to get or generate cartSessionID
// const getCartSessionId = () => {
//   // Check local storage for existing cartSessionID
//   let cartSessionID = localStorage.getItem('cartSessionID');
//   if (!cartSessionID) {
//     // Generate a new UUID if none exists
//     cartSessionID = uuidv4();
//     localStorage.setItem('cartSessionID', cartSessionID);
//   }
//   return cartSessionID;
// };

// /* -------------------- THUNKS (Async Actions) -------------------- */

// /**
//  * Add item(s) to cart for a user
//  */
// export const addToCart = createAsyncThunk(
//   'cart/add-to-cart',
//   async (product, { getState, rejectWithValue, dispatch }) => {
//     try {
//       const state = getState();
//       const selectedPaymentPlan = state.cart.selectedPaymentPlan || 'full';
//       const isAuthenticated = state.auth?.is_authenticated || false;

//       // Fetch latest cart state
//       const fetchResponse = await dispatch(fetchCart()).unwrap();
//       const serverCartItems = Array.isArray(fetchResponse.data?.cart_items)
//         ? fetchResponse.data.cart_items
//         : [];

//       // Check for existing item
//       const exists = serverCartItems.find(
//         (item) => String(item.productID) === String(product.productID)
//       );

//       // Prepare request body
//       const cartItem = {
//         productID: product.productID,

//         quantity: String(exists ? exists.quantity + 1 : product.quantity || 1),
//         ...(isAuthenticated
//           ? { userId: getUserId(state) }
//           : { cartSessionID: getCartSessionId() }),
//       };

//       // Use appropriate endpoint
//       const endpoint = exists ? '/cart/update-cart' : '/cart/add-to-cart';
//       const response = await httpClient.post(endpoint, cartItem);

//       if (!response.data?.success) {
//         throw new Error(
//           response.data?.message || 'Failed to add or update item in cart'
//         );
//       }

//       // Construct updated cart
//       const updatedCart = {
//         success: response.data.success,
//         data: {
//           cart_items: exists
//             ? serverCartItems.map((item) =>
//                 item.productID === product.productID
//                   ? {
//                       ...item,
//                       quantity: Number(item.quantity) + 1,
//                     }
//                   : item
//               )
//             : [
//                 ...serverCartItems,
//                 {
//                   productID: product.productID,
//                   productName:
//                     product.name ||
//                     response.data.data?.product?.productName?.replace(
//                       /\n/g,
//                       ''
//                     ) ||
//                     '',
//                   price:
//                     product.price || response.data.data?.product?.price || 0,
//                   quantity: parseInt(cartItem.quantity),
//                   paymentOptions: JSON.parse(product.paymentOptionsBreakdown),
//                   paymentPlan: selectedPaymentPlan,
//                   coverImage: product.coverImage,
//                 },
//               ],
//         },
//         cart_summary: {
//           total_items: exists
//             ? response.data.cart_summary?.total_items || serverCartItems.length
//             : (response.data.cart_summary?.total_items ||
//                 serverCartItems.length) + 1,
//           total_quantity:
//             (response.data.cart_summary?.total_quantity || 0) +
//             (exists ? 1 : parseInt(cartItem.quantity)),
//           total_amount:
//             (response.data.cart_summary?.total_amount || 0) +
//             parseFloat(
//               product.price || response.data.data?.product?.price || 0
//             ) *
//               parseInt(cartItem.quantity),
//         },
//       };

//       console.log('Updated Cart:', updatedCart);
//       return updatedCart;
//     } catch (error) {
//       return rejectWithValue(
//         error.message || 'Failed to add or update item in cart'
//       );
//     }
//   }
// );

// /**
//  * Fetch all cart items for a user
//  */
// export const fetchCart = createAsyncThunk(
//   'cart/fetchCart',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const state = getState();

//       // Example: Retrieve auth and cart info from Redux state
//       const isAuthenticated = state.auth?.isAuthenticated;
//       const userId = state.auth?.user?.id;
//       const cartSessionID =
//         state.cart?.sessionID || localStorage.getItem('cartSessionID');

//       const params = isAuthenticated ? { userId } : { cartSessionID };
//       const response = await httpClient.get('/cart/view-cart', { params });
//       if (!response.data?.success) {
//         return rejectWithValue(
//           response.data?.message || 'Failed to fetch cart'
//         );
//       }

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message || 'Failed to fetch cart');
//     }
//   }
// );

// /**
//  * Remove a cart item by ID
//  */

// export const removeFromCart = createAsyncThunk(
//   'cart/removeFromCart',
//   async ({ productID, cartSessionID }, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await httpClient.post('/cart/remove-from-cart', {
//         productID,
//         cartSessionID,
//       });

//       if (!response.data?.success) {
//         return rejectWithValue(
//           response.data?.message || 'Failed to remove item'
//         );
//       }

//       // Optional: Refresh cart after removal
//       dispatch(fetchCart());

//       return response.data;
//     } catch (error) {
//       console.error('Remove from cart failed:', error);
//       return rejectWithValue(error.message || 'Failed to remove item');
//     }
//   }
// );

// /**
//  * Update item quantity
//  */
// export const updateCartItem = createAsyncThunk(
//   'cart/updateCartItem',
//   async (
//     { productID, cartSessionID, quantity },
//     { dispatch, rejectWithValue }
//   ) => {
//     try {
//       const response = await httpClient.post('/cart/update-cart-item', {
//         productID,
//         cartSessionID,
//         quantity,
//       });

//       if (!response.data?.success) {
//         return rejectWithValue(
//           response.data?.message || 'Failed to update item'
//         );
//       }

//       // Option 1: Refresh the cart after update
//       dispatch(fetchCart());

//       return response.data;
//     } catch (error) {
//       console.error('Update cart item failed:', error);
//       return rejectWithValue(error.message || 'Failed to update item');
//     }
//   }
// );

// /**
//  * Clear all cart items for the user
//  */
// export const clearCart = createAsyncThunk(
//   'orders/create-mono-order-mandate/clearCart',
//   async () => {
//     const response = await httpClient.get(
//       `/orders/create-mono-order-mandate?userId=${getUserId}`
//     );
//     const cartItems = response.data;

//     // Delete all items concurrently
//     await Promise.all(
//       cartItems.map((item) =>
//         httpClient.delete(`/cart/clear-cart/${cartSessionID}`)
//       )
//     );
//     return [];
//   }
// );

// /* -------------------- SLICE -------------------- */

// const initialState = {
//   cart: [], // Array of cart items
//   status: 'idle', // idle | loading | succeeded | failed
//   error: null,
//   selectedPaymentPlan: 'full',
//   cart_summary: { total_items: 0, total_quantity: 0, total_amount: 0 },
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     setSelectedPaymentPlan: (state, action) => {
//       state.selectedPaymentPlan = action.payload;
//     },
//     setItemPaymentPlan: (state, action) => {
//       const { productID, plan, paymentOptions } = action.payload;
//       const item = state.cart.find((item) => item.productID === productID);
//       if (!item || item.paymentPlan === plan) return;

//       item.paymentPlan = plan;

//       const paymentMap = {};
//       for (const option of paymentOptions) {
//         if (option.type) paymentMap[option.type] = option;
//       }

//       const option = paymentMap[plan] || paymentMap.full;
//       if (!option) return;

//       item.paymentPlanDetails = {
//         type: plan,
//         amount: option.amount ?? item.price,
//         months: option.months ?? 0,
//         monthlyPayment: option.monthlyPayment ?? 0,
//         weeks: option.weeks ?? 0,
//         weeklyPayment: option.weeklyPayment ?? 0,
//         days: option.days ?? 0,
//         dailyPayment: option.dailyPayment ?? 0,
//         totalPrice: option.totalPrice ?? item.price,
//         fullPayment: option.fullPayment ?? 0,
//       };

//       item.price = option.amount ?? item.price;
//       item.totalPrice = item.price * (item.quantity || 1);
//       item.interest = option.interest ?? 0;

//       state.cart_summary = {
//         total_items: state.cart.length,
//         total_quantity: state.cart.reduce(
//           (sum, item) => sum + Number(item.quantity),
//           0
//         ),
//         total_amount: state.cart.reduce(
//           (sum, item) => sum + Number(item.totalPrice),
//           0
//         ),
//       };
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Cart
//       .addCase(fetchCart.pending, (state) => {
//         state.status = 'loading';
//       })

//       // .addCase(fetchCart.fulfilled, (state, action) => {
//       //   state.status = 'succeeded';

//       //   const summary = action.payload.data?.summary || {};
//       //   const newItems = Array.isArray(action.payload.data?.cart)
//       //     ? action.payload.data.cart
//       //     : [];

//       //   // Merge by productID to prevent duplicates
//       //   const mergedCart = [...state.cart];

//       //   newItems.forEach((newItem) => {
//       //     const existing = mergedCart.find(
//       //       (item) => item.productID === newItem.productID
//       //     );
//       //     if (existing) {
//       //       existing.quantity += newItem.quantity;
//       //     } else {
//       //       mergedCart.push(newItem);
//       //     }
//       //   });

//       //   state.cart = mergedCart;
//       //   state.cart_summary = {
//       //     total_items: summary.total_items || 0,
//       //     total_quantity: summary.total_quantity || summary.total_items || 0,
//       //     total_amount: summary.subtotal || 0,
//       //   };
//       // })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.status = 'succeeded';

//         const cartData = action.payload.data?.cart || {};
//         const items = Array.isArray(cartData.items) ? cartData.items : [];
//         // const summary = cartData.summary || {};
//         const summary = cartData.summary;

//         state.cart = items;
//         state.cart_summary = {
//           total_items: summary.total_items || 0,
//           total_quantity: summary.total_quantity || summary.total_items || 0,
//           total_amount: summary.subtotal || 0,
//         };
//       })

//       .addCase(fetchCart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || 'Failed to fetch cart';
//         state.cart = [];
//         state.cart_summary = {
//           total_items: 0,
//           total_quantity: 0,
//           total_amount: 0,
//         };
//       })
//       // Add Item
//       .addCase(addToCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.status = 'succeeded';

//         const newItems = Array.isArray(action.payload.data?.cart_items)
//           ? action.payload.data.cart_items
//           : [];

//         // Merge instead of replace
//         const mergedCart = [...state.cart];

//         newItems.forEach((item) => {
//           const existing = mergedCart.find(
//             (cartItem) => cartItem.productID === item.productID
//           );

//           if (existing) {
//             existing.quantity += item.quantity; // increase quantity if exists
//           } else {
//             mergedCart.push(item); // add new product
//           }
//         });

//         state.cart = mergedCart;

//         state.cart_summary =
//           action.payload.data?.cart_summary || state.cart_summary;
//       })
//       .addCase(addToCart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || 'Failed to add item';
//         toast.error(state.error, {
//           className:
//             'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
//           bodyClassName: 'm-0 p-0',
//           closeButton: false,
//         });
//       })

//       // Remove Item

//       .addCase(removeFromCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         // We are dispatching fetchCart after removal, so cart state will update there
//       })
//       .addCase(removeFromCart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Clear Cart
//       .addCase(clearCart.fulfilled, (state) => {
//         state.cart = [];
//         state.cart_summary = {
//           total_items: 0,
//           total_quantity: 0,
//           total_amount: 0,
//         };
//       });
//   },
// });

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../../api/http-clients';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

// --- Utils ---
const getCartSessionId = () => {
  let cartSessionID = localStorage.getItem('cartSessionID');
  if (!cartSessionID) {
    cartSessionID = uuidv4();
    localStorage.setItem('cartSessionID', cartSessionID);
  }
  return cartSessionID;
};

// --- Fetch Cart ---
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const isAuthenticated = state.auth?.is_authenticated || false;
      const userId = state.auth?.user?.id;
      const cartSessionID = getCartSessionId();

      const params = isAuthenticated ? { userId } : { cartSessionID };
      const response = await httpClient.get('/cart/view-cart', { params });

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

// --- Optimistic Add to Cart ---
export const addToCart = createAsyncThunk(
  'cart/add-to-cart',
  async (product, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState();
      const selectedPaymentPlan = state.cart.selectedPaymentPlan || 'full';
      const isAuthenticated = state.auth?.is_authenticated || false;

      // Fetch latest cart state
      const fetchResponse = await dispatch(fetchCart()).unwrap();
      const serverCartItems = Array.isArray(fetchResponse.data?.cart_items)
        ? fetchResponse.data.cart_items
        : [];

      // Check for existing item
      const exists = serverCartItems.find(
        (item) => String(item.productID) === String(product.productID)
      );

      // Prepare request body
      const cartItem = {
        productID: product.productID,

        quantity: String(exists ? exists.quantity + 1 : product.quantity || 1),
        ...(isAuthenticated
          ? { userId: getUserId(state) }
          : { cartSessionID: getCartSessionId() }),
      };

      // Use appropriate endpoint
      const endpoint = exists ? '/cart/update-cart' : '/cart/add-to-cart';
      const response = await httpClient.post(endpoint, cartItem);

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || 'Failed to add or update item in cart'
        );
      }

      // Construct updated cart
      const updatedCart = {
        success: response.data.success,
        data: {
          cart_items: exists
            ? serverCartItems.map((item) =>
                item.productID === product.productID
                  ? {
                      ...item,
                      quantity: Number(item.quantity) + 1,
                    }
                  : item
              )
            : [
                ...serverCartItems,
                {
                  productID: product.productID,
                  productName:
                    product.name ||
                    response.data.data?.product?.productName?.replace(
                      /\n/g,
                      ''
                    ) ||
                    '',
                  price:
                    product.price || response.data.data?.product?.price || 0,
                  quantity: parseInt(cartItem.quantity),
                  paymentOptions: JSON.parse(product.paymentOptionsBreakdown),
                  paymentPlan: selectedPaymentPlan,
                  coverImage: product.coverImage,
                },
              ],
        },
        cart_summary: {
          total_items: exists
            ? response.data.cart_summary?.total_items || serverCartItems.length
            : (response.data.cart_summary?.total_items ||
                serverCartItems.length) + 1,
          total_quantity:
            (response.data.cart_summary?.total_quantity || 0) +
            (exists ? 1 : parseInt(cartItem.quantity)),
          total_amount:
            (response.data.cart_summary?.total_amount || 0) +
            parseFloat(
              product.price || response.data.data?.product?.price || 0
            ) *
              parseInt(cartItem.quantity),
        },
      };
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to add or update item in cart'
      );
    }
  }
);

// export const addToCart = createAsyncThunk(
//   'cart/addToCart',
//   async (product, { getState, dispatch, rejectWithValue }) => {
//     const prevCart = [...getState().cart.cart];

//     // Optimistic update first
//     dispatch(cartSlice.actions.optimisticAdd(product));

//     try {
//       await httpClient.post('/cart/add-to-cart', {
//         productID: product.productID,
//         quantity: 1,
//         cartSessionID: getCartSessionId(),
//       });

//       // Sync with backend
//       return await dispatch(fetchCart()).unwrap();
//     } catch (error) {
//       // Rollback
//       dispatch(cartSlice.actions.rollback(prevCart));
//       toast.error('Failed to add item to cart');
//       return rejectWithValue(error.message || 'Failed to add to cart');
//     }
//   }
// );

// --- Remove from Cart ---
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ productID, cartSessionID }, { dispatch, rejectWithValue }) => {
    try {
      const response = await httpClient.post('/cart/remove-from-cart', {
        productID,
        cartSessionID,
      });

      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || 'Failed to remove item'
        );
      }

      // Optional: Refresh cart after removal
      dispatch(fetchCart());

      return response.data;
    } catch (error) {
      console.error('Remove from cart failed:', error);
      return rejectWithValue(error.message || 'Failed to remove item');
    }
  }
);

//  --- Update item quantity ---
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

const initialState = {
  cart: [],
  cart_summary: { total_items: 0, total_quantity: 0, total_amount: 0 },
  status: 'idle',
  error: null,
  selectedPaymentPlan: 'full',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    optimisticAdd: (state, action) => {
      const product = action.payload;
      const existing = state.cart.find(
        (item) => item.productID === product.productID
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }

      state.cart_summary.total_items = state.cart.length;
      state.cart_summary.total_quantity += 1;
      state.cart_summary.total_amount += Number(product.price || 0);
    },
    optimisticRemove: (state, action) => {
      const productID = action.payload;
      const item = state.cart.find((item) => item.productID === productID);

      if (item) {
        state.cart = state.cart.filter((i) => i.productID !== productID);
        state.cart_summary.total_items = state.cart.length;
        state.cart_summary.total_quantity -= item.quantity || 1;
        state.cart_summary.total_amount -=
          (item.price || 0) * (item.quantity || 1);
      }
    },
    rollback: (state, action) => {
      state.cart = action.payload;
      // Recompute summary
      state.cart_summary = {
        total_items: state.cart.length,
        total_quantity: state.cart.reduce(
          (sum, i) => sum + Number(i.quantity || 0),
          0
        ),
        total_amount: state.cart.reduce(
          (sum, i) => sum + Number(i.price || 0) * Number(i.quantity || 1),
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
        state.cart = cartData.items || [];
        state.cart_summary = cartData.summary || {
          total_items: 0,
          total_quantity: 0,
          total_amount: 0,
        };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const cartData = action.payload.data?.cart || {};
        state.cart = cartData.items || [];
        state.cart_summary = cartData.summary || state.cart_summary;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const cartData = action.payload.data?.cart || {};
        state.cart = cartData.items || [];
        state.cart_summary = cartData.summary || state.cart_summary;
      });
  },
});

export const { optimisticAdd, optimisticRemove, rollback } = cartSlice.actions;

// /* -------------------- SELECTORS -------------------- */
export const getCart = (state) => state.cart.cart;

export const getCartSummary = (state) => state.cart.cart_summary;

export const getTotalCartQuantity = (state) => {
  const cart = Array.isArray(state.cart.cart) ? state.cart.cart : [];
  return cart.length;
};
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + (item.total || 0), 0);

export const getCurrentQuantityById = (productID) => (state) =>
  state.cart.cart.find((item) => item.productID === productID)?.quantity ?? 0;
export const getSelectedPaymentPlan = (state) => state.cart.selectedPaymentPlan;
export default cartSlice.reducer;

// /* -------------------- ACTIONS -------------------- */
export const { setSelectedPaymentPlan, setItemPaymentPlan } = cartSlice.actions;
