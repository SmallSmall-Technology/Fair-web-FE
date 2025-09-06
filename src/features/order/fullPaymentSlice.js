import { createSlice } from '@reduxjs/toolkit';

const fullPaymentSlice = createSlice({
  name: 'fullPayment',
  initialState: {
    downPaymentSuccess: false,
    error: null,
  },
  reducers: {
    setDownPaymentSuccess: (state, action) => {
      state.downPaymentSuccess = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// ✅ Correct exports
export const { setDownPaymentSuccess, setError } = fullPaymentSlice.actions;
export default fullPaymentSlice.reducer;
