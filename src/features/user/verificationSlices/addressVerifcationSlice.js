import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVerified: false,
  data: null,
  loading: false,
  error: null,
};

const addressVerificationSlice = createSlice({
  name: 'addressVerification',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.data = action.payload;
      state.isVerified = !!action.payload;
      state.error = null;
    },
    setAddressLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAddressError: (state, action) => {
      state.error = action.payload;
    },
    clearAddress: () => initialState,
  },
});

export const { setAddress, setAddressLoading, setAddressError, clearAddress } =
  addressVerificationSlice.actions;

export const selectAddressVerificationStatus = (state) =>
  state.addressVerification.isVerified;
export const selectAddressVerificationData = (state) =>
  state.addressVerification.data;
export const selectAddressLoading = (state) =>
  state.addressVerification.loading;
export const selectAddressError = (state) => state.addressVerification.error;

export default addressVerificationSlice.reducer;
