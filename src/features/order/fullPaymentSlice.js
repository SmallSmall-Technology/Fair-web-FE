import { createSlice } from '@reduxjs/toolkit';

const fullPaymentSlice = createSlice({
  name: 'fullPayment',
  initialState: {
    downPaymentSuccess: false,
    paystackOrderReference: null,
    error: null,
    directDebitInitiation: false,
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
    setDirectDebitInitiation: (state, action) => {
      state.directDebitInitiation = action.payload;
    },
  },
});

// ✅ Correct exports
export const {
  setDownPaymentSuccess,
  setPaystackOrderReference,
  setError,
  setDirectDebitInitiation,
} = fullPaymentSlice.actions;
export default fullPaymentSlice.reducer;
