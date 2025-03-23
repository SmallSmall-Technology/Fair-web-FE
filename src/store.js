import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import favouriteReducer from "./features/favourite/favouriteSlice";
import recentlyViewedReducer from "./features/product/recentlyViewedSlice";

const persistConfig = {
  key: "cart",
  storage,
  whitelist: ["cart", "favourite", "user", "recentlyViewed"],
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedFavouriteReducer = persistReducer(
  persistConfig,
  favouriteReducer
);
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedRecentlyViewed = persistReducer(
  persistConfig,
  recentlyViewedReducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    cart: persistedCartReducer,
    favourite: persistedFavouriteReducer,
    recentlyViewed: persistedRecentlyViewed,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
