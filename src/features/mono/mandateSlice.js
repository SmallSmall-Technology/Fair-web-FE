import { createSlice } from '@reduxjs/toolkit';
import httpClient from '../../api/http-clients';

const mandateSlice = createSlice({
  name: 'mandate',
  initialState: {
    data: null,
  },
  reducers: {
    setMandateData: (state, action) => {
      state.data = action.payload;
    },
    clearMandateData: (state) => {
      state.data = null;
    },
  },
});

export const { setMandateData, clearMandateData } = mandateSlice.actions;
export const selectMandateData = (state) => state.mandate.data;
export default mandateSlice.reducer;

// Thunk to create a mandate
export const createMandate = (mandateData) => async (dispatch) => {
  try {
    const { data } = await httpClient.post(
      'orders/create-mono-order-mandate',
      mandateData
    );

    dispatch(setMandateData(data)); // store the mandate info from API
    return data;
  } catch (error) {
    console.error('Error creating mandate:', error);
    throw error;
  }
};

// Simple action to clear mandate
export const clearMandate = () => clearMandateData();
