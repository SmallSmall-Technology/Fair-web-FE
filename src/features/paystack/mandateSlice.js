import { createSlice } from '@reduxjs/toolkit';
import httpClient from '../../api/http-clients';

const mandateSlice = createSlice({
  name: 'mandate',
  initialState: {
    data: {},
    authorized: false,
    bankDetails: {},
  },
  reducers: {
    setMandateData: (state, action) => {
      state.data = {
        ...state.data, // keep existing fields
        ...action.payload, // update only what’s new
      };
    },
    setBankDetails: (state, action) => {
      state.bankDetails = action.payload;
    },
    clearMandateData: (state) => {
      state.data = {};
    },
    setAuthorized: (state, action) => {
      state.authorized = action.payload;
    },
  },
});

export const {
  setMandateData,
  clearMandateData,
  setAuthorized,
  setBankDetails,
} = mandateSlice.actions;
export const selectMandateData = (state) => state.mandate.data;
export default mandateSlice.reducer;

// Thunk to create a mandate
export const createMandate = (mandateData) => async (dispatch) => {
  try {
    const { data } = await httpClient.post(
      'orders/create-paystack-order-mandate',
      mandateData
    );

    dispatch(setMandateData(data));
    return data;
  } catch (error) {
    throw error;
  }
};

// Simple action to clear mandate
export const clearMandate = () => clearMandateData();
