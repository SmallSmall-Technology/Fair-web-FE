import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favourite: [],
};

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addItemToFavourite(state, action) {
      state.favourite.push(action.payload);
      localStorage.setItem('favourite', JSON.stringify(state.favourite));
    },
    removeItemFromFavourite(state, action) {
      state.favourite = state.favourite.filter(
        (item) => item.productID !== action.payload.productID
      );
      localStorage.setItem('favourite', JSON.stringify(state.favourite));
    },
    clearFavourite(state) {
      state.favourite = [];
    },
  },
});

export const { addItemToFavourite, removeItemFromFavourite, clearFavourite } =
  favouriteSlice.actions;
export default favouriteSlice.reducer;

export const getFavourites = (state) => state.favourite.favourite;

export const getTotalFavouritesQuantity = (state) =>
  (state.favourite.favourite || []).reduce((total, item) => {
    return item && item.quantity ? total + item.quantity : total;
  }, 0);
