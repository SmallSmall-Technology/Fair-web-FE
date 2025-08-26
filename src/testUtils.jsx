// test-utils.js
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// import your slices
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import recentlyViewedReducer from './features/product/recentlyViewedSlice';
import productReducer from './features/product/productSlice';
import orderReducer from './features/order/orderSlice';
import authReducer from './features/auth/authSlice';
import mandateReducer from './features/mono/mandateSlice';
import deliveryReducer from './features/order/deliveryAddressSlice';
import accountVerificationReducer from './features/user/accountVerificationSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  recentlyViewed: recentlyViewedReducer,
  products: productReducer,
  order: orderReducer,
  delivery: deliveryReducer,
  auth: authReducer,
  mandate: mandateReducer,
  accountVerification: accountVerificationReducer,
});

export function renderWithStore(ui, { preloadedState = {}, store } = {}) {
  const testStore =
    store ||
    configureStore({
      reducer: rootReducer,
      preloadedState,
    });

  return {
    store: testStore,
    ui: <Provider store={testStore}>{ui}</Provider>,
  };
}
