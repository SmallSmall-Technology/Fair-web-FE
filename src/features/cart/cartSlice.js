import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // cart: [],
  cart: [
    // {
    //   id: 1,
    //   name: "Totoya",
    //   brand: "Toyota",
    //   category: "Electronics",
    //   subcategory: "Television",
    //   image:
    //     "https://images.unsplash.com/photo-1584949035913-2f52ecf2a7c2?auto=format&fit=crop&w=500&q=60",
    //   price: "20,000",
    //   discountPrice: "5000",
    //   ratings: 3.5,
    //   noOfProductSold: 5,
    //   slug: "Radio TV",
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      const exists = state.cart.find((item) => item.id === action.payload.id);
      if (exists) {
        alert("Item already added to cart");
        return;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeItem(state, action) {
      //payload = id
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = id
      const item = state.cart.find((item) => item.id === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * Number(item.price);
    },
    decreaseItemQuantity(state, action) {
      //payload = id
      const item = state.cart.find((item) => item.id === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * Number(item.price);
    },
    clearCart(state) {
      state.cart = [];
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

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
