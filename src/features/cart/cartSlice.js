import axios from 'axios';
import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000';
// const navigate = useNavigate();
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get(`${API_URL}/cart?userId=user123`);
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

export const addItem = createAsyncThunk(
  'cart/addItem',
  async (product, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const selectedPaymentPlan = state.cart.selectedPaymentPlan;
      const exists = state.cart.cart.find(
        (item) => item.productId === product.id
      );

      if (exists) {
        toast.dismiss();
        toast.error('Item already in cart', {
          className:
            'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
          bodyClassName: 'm-0 p-0',
          closeButton: false,
        });
        return rejectWithValue();
      }

      const paymentMap = {};
      product.paymentOptions.forEach((option) => {
        if (option.type) {
          paymentMap[option.type] = option;
        }
      });
      // console.log(paymentMap);

      const selectedOption =
        paymentMap[selectedPaymentPlan] || paymentMap.upfront;
      if (!selectedOption) {
        throw new Error(`${selectedPaymentPlan} payment option not available`);
      }

      const quantity = 1;
      let price;
      if (selectedPaymentPlan === 'daily') {
        price = selectedOption.dailyPayment || product.price;
      } else if (selectedPaymentPlan === 'weekly') {
        price = selectedOption.weeklyPayment || product.price;
      } else if (selectedPaymentPlan === 'monthly') {
        price = selectedOption.monthlyPayment || product.price;
      } else {
        price = selectedOption.amount || product.price;
      }

      const cartItem = {
        // id: `cart-${product.id}-${selectedPaymentPlan}-${Date.now()}`,
        id: product.id,
        category: product.category,
        image: product.image,
        name: product.name,
        userId: 'user123',
        productId: product.id,
        quantity,
        price: Number(price),
        totalPrice: Number(price) * quantity,
        paymentPlan: selectedPaymentPlan,
        paymentPlanDetails: {
          type: selectedPaymentPlan,
          amount: selectedOption.amount || product.price,
          months: selectedOption.months || 0,
          monthlyPayment: selectedOption.monthlyPayment || 0,
          weeks: selectedOption.weeks || 0,
          weeklyPayment: selectedOption.weeklyPayment || 0,
          days: selectedOption.days || 0,
          dailyPayment: selectedOption.dailyPayment || 0,
          totalPrice: selectedOption.totalPrice || product.price,
          upfrontPayment: selectedOption.upfrontPayment || 0,
        },
        deliveryDate: product.deliveryDate || 'Jan, 20 2025',
        interest: selectedOption.interest || 0,
      };
      const response = await axios.post(`${API_URL}/cart`, cartItem);
      // console.log(cartItem);
      const sanitizedResponse = {
        id: response.data.id,
        image: response.data.image,
        name: response.data.name,
        userId: response.data.userId,
        productId: response.data.productId,
        quantity: response.data.quantity,
        price: response.data.price,
        totalPrice: response.data.totalPrice,
        paymentPlan: response.data.paymentPlan,
        paymentPlanDetails: response.data.paymentPlanDetails,
        deliveryDate: response.data.deliveryDate,
        interest: response.data.interest,
      };

      // toast.dismiss();
      // toast.success('Item added to cart', {
      //   className:
      //     'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
      //   bodyClassName: 'm-0 p-0',
      //   closeButton: false,
      // });
      // toast(
      //   <div className="flex items-center space-x-2">
      //     <span>Item added to cart</span>
      //     <span className="text-black">|</span>
      //     <button
      //       onClick={() => navigate('/cart-items')}
      //       className="underline text-sm"
      //     >
      //       View cart
      //     </button>
      //   </div>,
      //   {
      //     type: 'success',
      //     className:
      //       'bg-[#FFDE11] text-black text-sm px-2 py-1 rounded-md min-h-0',
      //     bodyClassName: 'm-0 p-0',
      //     closeButton: false,
      //   }
      // );

      return sanitizedResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

      return {
        id: response.data.id,
        // id: `cart-${product.id}-${getSelectedPaymentPlan}-${Date.now()}`,
        image: response.data.image,
        name: response.data.name,
        userId: response.data.userId,
        productId: response.data.productId,
        quantity: response.data.quantity,
        price: response.data.price,
        totalPrice: response.data.totalPrice,
        paymentPlan: response.data.paymentPlan,
        paymentPlanDetails: response.data.paymentPlanDetails,
        deliveryDate: response.data.deliveryDate,
        interest: response.data.interest,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      return {
        id: response.data.id,
        image: response.data.image,
        name: response.data.name,
        userId: response.data.userId,
        productId: response.data.productId,
        quantity: response.data.quantity,
        price: response.data.price,
        totalPrice: response.data.totalPrice,
        paymentPlan: response.data.paymentPlan,
        paymentPlanDetails: response.data.paymentPlanDetails,
        deliveryDate: response.data.deliveryDate,
        interest: response.data.interest,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  selectedPaymentPlan: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setSelectedPaymentPlan: (state, action) => {
      state.selectedPaymentPlan = action.payload;
    },
    setItemPaymentPlan: (state, action) => {
      const { id, plan, paymentOptions } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (!item) return;

      if (item.paymentPlan === plan) return;

      item.paymentPlan = plan;

      const paymentMap = {};
      for (const option of paymentOptions) {
        if (option.type) {
          paymentMap[option.type] = option;
        }
      }

      const option = paymentMap[plan] || paymentMap.upfront;
      if (!option) return;

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
        upfrontPayment: option.upfrontPayment ?? 0,
      };

      let price = 0;
      if (plan === 'upfront') price = option.amount ?? item.price;
      else if (plan === 'monthly') price = option.monthlyPayment ?? 0;
      else if (plan === 'weekly') price = option.weeklyPayment ?? 0;
      else if (plan === 'daily') price = option.dailyPayment ?? 0;

      item.price = price;
      item.totalPrice = price * (item.quantity || 1);
      item.interest = option.interest ?? 0;

      delete item.paymentOptions;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && action.payload.quantity) {
          state.cart.push(action.payload);
        }
      })
      .addCase(addItem.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload, {
          className:
            'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
          bodyClassName: 'm-0 p-0',
          closeButton: false,
        });
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
  state.cart.cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.productId === id)?.quantity ?? 0;

export const getSelectedPaymentPlan = (state) => state.cart.selectedPaymentPlan;

export const { setSelectedPaymentPlan, setItemPaymentPlan } = cartSlice.actions;
