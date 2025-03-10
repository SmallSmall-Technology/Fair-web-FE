import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import favouriteReducer from "./features/favourite/favouriteSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
  },
});

export default store;
