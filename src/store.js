import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import favouriteReducer from "./features/favourite/favouriteSlice";

const persistConfig = {
  key: "cart",
  storage,
  whitelist: ["cart", "favourite", "user"],
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedFavouriteReducer = persistReducer(
  persistConfig,
  favouriteReducer
);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    cart: persistedCartReducer,
    favourite: persistedFavouriteReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
