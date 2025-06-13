import { lazy } from 'react';

export const RealEstateHome = lazy(
  () => import('./pages/home/realEstateHome/RealEstateHome')
);
export const ConsumerGoodsHome = lazy(
  () => import('./pages/home/consumerGoods/ConsumerGoodsHome')
);
export const HomeLivingHome = lazy(
  () => import('./pages/home/homeLivingLandingPage/HomeLivingHome')
);
export const ElectronicsHome = lazy(
  () => import('./pages/home/electronicsHome/ElectronicsHome')
);
export const FoodAndDrinkHome = lazy(
  () => import('./pages/home/foodAndDrink/FoodAndDrinkHome')
);
export const CartItems = lazy(() => import('./pages/cartItems/CartItems'));
export const CheckoutItems = lazy(
  () => import('./pages/checkoutItems/CheckoutItems')
);
export const CheckoutPaymentSuccess = lazy(
  () => import('./pages/checkoutPaymentSuccess/CheckoutPaymentSuccess')
);
export const PageNotFound = lazy(
  () => import('./pages/pageNotFound/PageNotFound')
);

export const SingleProductPage = lazy(
  () => import('./pages/productCategories/SingleProductPage')
);

export const CategoryPage = lazy(
  () => import('./pages/productCategories/categoryPage/CategoryPage')
);
// export const SubCategoryPage = lazy(
//   () => import('./pages/productCategories/SubCategoryPage')
// );
export const UserDashboard = lazy(
  () => import('./pages/userDashboard/UserDashboard')
);
export const ShoppingOverview = lazy(
  () =>
    import('./pages/userDashboard/shopping/shoppingOverview/ShoppingOverview')
);
// export const Summary = lazy(
//   () =>
//     import('./pages/userDashboard/shopping/shoppingOverviewContents/Summary')
// );
// export const Purchases = lazy(
//   () =>
//     import(
//       './pages/userDashboard/shopping/shoppingOverviewContents/purchase/Purchases'
//     )
// );
export const Wallet = lazy(
  () => import('./pages/userDashboard/shopping/shoppingOverviewContents/Wallet')
);

export const DirectDebit = lazy(
  () =>
    import(
      './pages/userDashboard/shopping/shoppingOverviewContents/DirectDebit/DirectDebit'
    )
);
export const Favorites = lazy(
  () =>
    import('./pages/userDashboard/shopping/shoppingOverviewContents/Favorites')
);
export const RecentlyViewed = lazy(
  () =>
    import(
      './pages/userDashboard/shopping/shoppingOverviewContents/recentlyViewed/RecentlyViewed'
    )
);
export const Notifications = lazy(
  () => import('./pages/userDashboard/notifications/Notifications')
);
export const AccountProfile = lazy(
  () => import('./pages/userDashboard/accountProfile/AccountProfile')
);
