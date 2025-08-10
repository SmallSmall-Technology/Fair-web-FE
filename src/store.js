import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import favouriteReducer from './features/favourite/favouriteSlice';
import recentlyViewedReducer from './features/product/recentlyViewedSlice';
import productReducer from './features/product/productSlice';
import orderReducer from './features/order/orderSlice';
import authReducer from './features/auth/authSlice';
import mandateReducer from './features/mono/mandateSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  favourite: favouriteReducer,
  recentlyViewed: recentlyViewedReducer,
  products: productReducer,
  order: orderReducer,
  auth: authReducer,
  mandate: mandateReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'cart',
    'favourite',
    'user',
    'recentlyViewed',
    'products',
    'order',
    'auth',
    'mandate',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
