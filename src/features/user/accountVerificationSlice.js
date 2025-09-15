import { createSelector, createSlice } from '@reduxjs/toolkit';
import { isUserDebtProfileVerified } from './userSlice';

const initialState = {
  verificationStatus: {
    id: { isVerified: false, data: null },
    address: { isVerified: false, data: null },
    debt: { isVerified: false, data: null }, // <- we won’t manually maintain this anymore
  },
  loading: false,
  error: null,
};

const accountVerificationSlice = createSlice({
  name: 'accountVerification',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.verificationStatus.id.data = action.payload;
      state.verificationStatus.id.isVerified = !!action.payload;
      state.error = null;
    },
    setAddress: (state, action) => {
      state.verificationStatus.address.data = action.payload;
      state.verificationStatus.address.isVerified = !!action.payload;
      state.error = null;
    },
    setDebt: (state, action) => {
      state.verificationStatus.debt.data = action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearVerification: (state) => {
      state.verificationStatus = {
        id: { isVerified: false, data: null },
        address: { isVerified: false, data: null },
        debt: { isVerified: false, data: null },
      };
      state.loading = false;
      state.error = null;
    },
  },
});

// Actions
export const {
  setId,
  setAddress,
  setDebt,
  setLoading,
  setError,
  clearVerification,
} = accountVerificationSlice.actions;

// ✅ Selectors
export const selectVerificationStatus = (state, type) => {
  if (type === 'debt') {
    return isUserDebtProfileVerified(state);
  }
  return state.accountVerification?.verificationStatus[type]?.isVerified;
};
// export const selectVerificationStatus = createSelector(
//   (state) => state.accountVerification?.verificationStatus,
//   (verificationStatus) => ({
//     id: verificationStatus?.id || false,
//     address: verificationStatus?.address || false,
//     debt: verificationStatus?.debt || false,
//   })
// );

// export const selectVerificationStatus = (type) =>
//   createSelector(
//     (state) => state.accountVerification?.verificationStatus,
//     (verificationStatus) => verificationStatus?.[type] || false
//   );

export const selectVerificationData = (state, type) =>
  state.accountVerification?.verificationStatus[type]?.data || null;

export const selectLoading = (state) => state.accountVerification?.loading;
export const selectError = (state) => state.accountVerification?.error;

export default accountVerificationSlice.reducer;
