import axios from 'axios';
import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get(`${API_URL}/cart?userId=user123`);
  return response.data;
});

export const addItem = createAsyncThunk(
  'cart/addItem',
  async (product, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const exists = state.cart.cart.find(
        (item) => item.productId === product.id
      );

      if (exists) {
        toast.dismiss();
        toast.error('Item already added to cart', {
          className:
            'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
          bodyClassName: 'm-0 p-0',
          closeButton: false,
        });
        return;
      }

      const cartItem = {
        id: `cart${Date.now()}`,
        image: product.image,
        name: product.name,
        userId: 'user123',
        productId: product.id,
        quantity: 1,
        price: Number(product.price),
        totalPrice: Number(product.price),
        paymentOptions: [
          {
            type: 'upfront',
            amount: product.price,
          },
          {
            type: 'installments',
            months: 12,
            upfrontPayment: product.price * 0.4,
            monthlyPayment: (product.price * 0.6) / 12,
            totalPrice: product.price,
          },
        ],
      };

      const response = await axios.post(`${API_URL}/cart`, cartItem);

      // // Validate API response
      // if (!response.data || !response.data.quantity) {
      //   throw new Error("Invalid cart item received from API");
      // }
      toast.dismiss();
      toast.success('Item added to cart', {
        className:
          'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove item from cart
export const removeItem = createAsyncThunk(
  'cart/removeItem',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/cart/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Increase item quantity
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
      const response = await axios.put(`${API_URL}/cart/${id}`, updatedItem);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Decrease item quantity
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
      const response = await axios.put(`${API_URL}/cart/${id}`, updatedItem);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  const response = await axios.get(`${API_URL}/cart?userId=user123`);
  const cartItems = response.data;
  await Promise.all(
    cartItems.map((item) => axios.delete(`${API_URL}/cart/${item.id}`))
  );
  return [];
});

const initialState = {
  cart: [],
  status: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = 'succeeded';
      })
      // .addCase(addItem.fulfilled, (state, action) => {
      //   state.cart.push(action.payload);
      // })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && action.payload.quantity) {
          state.cart.push(action.payload);
        } else {
          return;
          // console.error("Invalid cart item:", action.payload);
        }
      })
      .addCase(addItem.rejected, (state, action) => {
        state.error = action.payload;
        alert(action.payload);
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(increaseItemQuantity.fulfilled, (state, action) => {
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.cart[index] = action.payload;
      })
      .addCase(decreaseItemQuantity.fulfilled, (state, action) => {
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.cart[index] = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = [];
      });
  },
});

export default cartSlice.reducer;
export const getCart = (state) => state.cart.cart;
export const getTotalCartQuantity = (state) =>
  (state.cart.cart || []).reduce((total, item) => {
    return item && item.quantity ? total + item.quantity : total;
  }, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.productId === id)?.quantity ?? 0;
