import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourite: [],
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addItemToFavourite(state, action) {
      state.favourite.push(action.payload);
    },
    removeItemFromFavourite(state, action) {
      state.favourite = state.favourite.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearFavourite() {
      state.favourite = [];
    },
  },
});

export const { addItemToFavourite, removeItemFromFavourite, clearFavourite } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
