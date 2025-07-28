import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage if it exists
const savedFavourites = localStorage.getItem('favourite');
const initialState = {
  favourite: savedFavourites ? JSON.parse(savedFavourites) : [],
};

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addItemToFavourite(state, action) {
      const exists = state.favourite.some(
        (item) => item.productID === action.payload.productID
      );
      if (!exists) {
        state.favourite.push(action.payload);
        localStorage.setItem('favourite', JSON.stringify(state.favourite));
      }
    },
    removeItemFromFavourite(state, action) {
      state.favourite = state.favourite.filter(
        (item) => item.productID !== action.payload.productID
      );
      localStorage.setItem('favourite', JSON.stringify(state.favourite));
    },
    clearFavourite(state) {
      state.favourite = [];
      localStorage.removeItem('favourite');
    },
  },
});

export const { addItemToFavourite, removeItemFromFavourite, clearFavourite } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;

// Selectors
export const getFavourites = (state) => state.favourite.favourite;

export const getTotalFavouritesQuantity = (state) =>
  (state.favourite.favourite || []).reduce((total, item) => {
    const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
    return total + quantity;
  }, 0);
