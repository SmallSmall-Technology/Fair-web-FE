import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recentlyViewed: [],
  maxItems: 10,
};

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {
    addItemToRecentlyViewed(state, action) {
      const newProduct = action.payload;
      const filteredItems = state.recentlyViewed.filter(
        (item) => item.id !== newProduct.id
      );
      const updatedItems = [newProduct, ...filteredItems].slice(
        0,
        state.maxItems
      );

      state.recentlyViewed = updatedItems;

      // localStorage.setItem("recentlyViewed", JSON.stringify(updatedItems));
    },
    clearRecentlyViewed(state) {
      state.recentlyViewed = [];
      // localStorage.setItem("recentlyViewed", JSON.stringify([]));
    },
  },
});

export const { addItemToRecentlyViewed, clearRecentlyViewed } =
  recentlyViewedSlice.actions;

export const getRecentlyViewed = (state) => state.recentlyViewed.recentlyViewed;

export default recentlyViewedSlice.reducer;
