import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import recentlyViewedReducer from './features/product/recentlyViewedSlice';
import productReducer from './features/product/productSlice';
import orderReducer from './features/order/orderSlice';
import authReducer from './features/auth/authSlice';
import mandateReducer from './features/paystack/mandateSlice';
import deliveryReducer from './features/order/deliveryAddressSlice';
import fullPaymentReducer from './features/order/fullPaymentSlice';

// import idVerificationReducer from './features/user/verificationSlices/idVerificationSlice';
import addressVerificationReducer from './features/user/verificationSlices/addressVerifcationSlice';
import debtVerificationReducer from './features/user/verificationSlices/debtVerificationSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  recentlyViewed: recentlyViewedReducer,
  products: productReducer,
  order: orderReducer,
  delivery: deliveryReducer,
  auth: authReducer,
  mandate: mandateReducer,
  fullPayment: fullPaymentReducer,

  // idVerification: idVerificationReducer,
  addressVerification: addressVerificationReducer,
  debtVerification: debtVerificationReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'cart',
    'user',
    'recentlyViewed',
    'products',
    'order',
    'delivery',
    'auth',
    'mandate',
    'fullPayment',

    'idVerification',
    'addressVerification',
    'debtVerification',
  ],
  blacklist: ['loading', 'error'],
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
