import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current_address: null, // 👈 currently selected address
  delivery_address: null, // 👈 last added delivery address
  latest_address: null, // 👈 most recently updated address
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    updateLatestDeliveryAddress: (state, action) => {
      state.latest_address = action.payload;
    },
    addDeliveryAddress: (state, action) => {
      state.delivery_address = action.payload;
    },
    setSelectedDeliveryAddress: (state, action) => {
      state.current_address = action.payload;
    },
    clearDeliveryAddresses: (state) => {
      state.current_address = null;
      state.delivery_address = null;
      state.latest_address = null;
    },
  },
});

// ✅ export actions
export const {
  updateLatestDeliveryAddress,
  addDeliveryAddress,
  setSelectedDeliveryAddress,
  clearDeliveryAddresses,
} = deliverySlice.actions;

export default deliverySlice.reducer;

// ✅ selectors
export const selectLatestDeliveryAddress = (state) =>
  state.delivery.latest_address;
export const selectCurrentDeliveryAddress = (state) =>
  state.delivery.delivery_address;
export const selectCurrentAddress = (state) => state.delivery.current_address;
