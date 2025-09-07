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
  },
});

// ✅ Correct exports
export const { setDownPaymentSuccess, setPaystackOrderReference, setError } =
  fullPaymentSlice.actions;
export default fullPaymentSlice.reducer;
