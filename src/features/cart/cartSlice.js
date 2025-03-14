import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const exists = state.cart.find((item) => item.id === action.payload.id);
      if (exists) {
        alert("Item already added to cart");
        return;
      }
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * Number(item.price);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.quantity * Number(item.price);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    clearCart(state) {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item?.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item?.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;
