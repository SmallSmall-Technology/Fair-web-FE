import { createSlice } from '@reduxjs/toolkit';
import { set } from 'react-hook-form';

const initialState = {
  user: {
    // id: null,
    // firstName: '',
    // lastName: '',
    // email: '',
    // phoneNumber: '',
    // current_address: null,
    // isTier2: null,
    // userCategory: null,
    // lastLogin: null,
    // createdAt: null,
    // updatedAt: null,
    // delivery_address: null,
    // debt_profile_verification: null,
    // residentialAddress: null,
  },
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.status = 'succeeded';
      state.error = null;
    },
    updateLatestDeliveryAddress: (state, action) => {
      state.user.current_address = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    addDeliveryAddress: (state, action) => {
      state.user.delivery_address = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setSelectedDeliveryAddress: (state, action) => {
      state.user.delivery_address = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = initialState.user;
      state.status = 'idle';
      state.error = null;
    },
    setDebtProfileVerification: (state, action) => {
      state.user.debt_profile_verification = action.payload;
      state.status = 'VERIFIED';
      state.error = null;
    },
    setResidentialAddress: (state, action) => {
      state.user.residentialAddress = action.payload;
      state.status = 'succeeded';
    },
  },
});

export const {
  setUser,
  updateLatestDeliveryAddress,
  addDeliveryAddress,
  setError,
  clearUser,
  setSelectedDeliveryAddress,
  setDebtProfileVerification,
} = userSlice.actions;
export default userSlice.reducer;

export const selectLatestDeliveryAddress = (state) => {
  const user = state.user.user;
  return user?.current_address?.streetAddress && user?.current_address?.state;
};

export const selectCurrentDeliveryAddress = (state) => {
  const user = state.user.user;
  return user?.delivery_address || null;
};

export const selectCurrentAddress = (state) => {
  const user = state.user.user;
  return user?.current_address || null;
};

export const getUserFullName = (state) => {
  const user = state.user.user;
  return `${user.firstName} ${user.lastName}`.trim() || 'Guest';
};

export const getUserFirstName = (state) => {
  const user = state.user.user;
  return user.firstName || 'Guest';
};

export const isUserDebtProfileVerified = (state) => {
  const user = state.user.user;
  return user.debt_profile_verification === 'VERIFIED';
};
