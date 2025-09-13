import { createSlice } from '@reduxjs/toolkit';

const fullPaymentSlice = createSlice({
  name: 'fullPayment',
  initialState: {
    downPaymentSuccess: false,
    paystackOrderReference: null,
    error: null,
  },
  reducers: {
    setDownPaymentSuccess: (state, action) => {
      state.downPaymentSuccess = action.payload;
    },
    setPaystackOrderReference: (state, action) => {
      state.paystackOrderReference = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetFullPayment: (state) => {
      state.downPaymentSuccess = false;
      state.paystackOrderReference = null;
    },
  },
});

export const {
  setDownPaymentSuccess,
  setPaystackOrderReference,
  setError,
  resetFullPayment,
} = fullPaymentSlice.actions;
export default fullPaymentSlice.reducer;
