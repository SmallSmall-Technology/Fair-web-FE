import { createSlice } from '@reduxjs/toolkit';
import { isUserDebtProfileVerified } from '../userSlice';
// import { isUserDebtProfileVerified } from './userSlice';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const debtVerificationSlice = createSlice({
  name: 'debtVerification',
  initialState,
  reducers: {
    setDebt: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    setDebtLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDebtError: (state, action) => {
      state.error = action.payload;
    },
    clearDebt: () => initialState,
  },
});

export const { setDebt, setDebtLoading, setDebtError, clearDebt } =
  debtVerificationSlice.actions;

//  Selector using external source of truth
export const selectDebtVerificationStatus = (state) =>
  isUserDebtProfileVerified(state);
export const selectDebtVerificationData = (state) =>
  state.debtVerification.data;
export const selectDebtLoading = (state) => state.debtVerification.loading;
export const selectDebtError = (state) => state.debtVerification.error;

export default debtVerificationSlice.reducer;
