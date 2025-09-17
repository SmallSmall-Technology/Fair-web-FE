import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVerified: false,
  data: null,
  loading: false,
  error: null,
};

const idVerificationSlice = createSlice({
  name: 'idVerification',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.data = action.payload;
      state.isVerified = !!action.payload;
      state.error = null;
    },
    setIdLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIdError: (state, action) => {
      state.error = action.payload;
    },
    clearId: () => initialState,
  },
});

export const { setId, setIdLoading, setIdError, clearId } =
  idVerificationSlice.actions;

export const selectIdVerificationStatus = (state) =>
  state.idVerification.isVerified;
export const selectIdVerificationData = (state) => state.idVerification.data;
export const selectIdLoading = (state) => state.idVerification.loading;
export const selectIdError = (state) => state.idVerification.error;

export default idVerificationSlice.reducer;
