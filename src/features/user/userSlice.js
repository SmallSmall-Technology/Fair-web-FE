import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    deliveryAddress: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.user.name = action.payload;
    },
    saveDeliveryAddress(state, action) {
      state.user.deliveryAddress.push(action.payload);
    },
    editDeliveryAddress(state, action) {
      if (state.user.deliveryAddress.length > 0) {
        state.user.deliveryAddress[0] = action.payload;
      } else {
        state.user.deliveryAddress.push(action.payload);
      }
    },
  },
});

export const { updateName, saveDeliveryAddress, editDeliveryAddress } =
  userSlice.actions;

export default userSlice.reducer;
