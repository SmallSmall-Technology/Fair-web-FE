import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current_address: null,
  delivery_address: null,
  latest_address: null,
  deliveryType: null,
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
    setSelectedDeliveryType: (state, action) => {
      state.deliveryType = action.payload;
    },
    setDeleteAddress: (state, action) => {
      state.current_address = null;
    },
    clearDeliveryAddresses: (state) => {
      state.current_address = null;
      state.delivery_address = null;
      state.latest_address = null;
      state.deliveryType = null;
    },
  },
});

export const {
  updateLatestDeliveryAddress,
  addDeliveryAddress,
  setSelectedDeliveryAddress,
  clearDeliveryAddresses,
  setSelectedDeliveryType,
  setDeleteAddress,
} = deliverySlice.actions;

export default deliverySlice.reducer;

export const selectLatestDeliveryAddress = (state) =>
  state.delivery.latest_address;
export const selectCurrentDeliveryAddress = (state) =>
  state.delivery.delivery_address;
export const selectCurrentAddress = (state) => state.delivery.current_address;
export const selectedDeliveryType = (state) => state.delivery.deliveryType;
