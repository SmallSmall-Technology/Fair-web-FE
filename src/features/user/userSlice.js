import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    current_address: null,
    isTier2: null,
    userCategory: null,
    lastLogin: null,
    createdAt: null,
    updatedAt: null,
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
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = initialState.user;
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const {
  setUser,
  updateLatestDeliveryAddress,
  addDeliveryAddress,
  setError,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;

export const selectLatestDeliveryAddress = (state) => {
  const user = state.user.user;
  return user?.current_address?.streetAddress && user?.current_address?.state
    ? `${user.current_address.streetAddress}, ${user.current_address.state}`
    : 'No delivery address';
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
