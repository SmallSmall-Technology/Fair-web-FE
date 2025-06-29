import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import Layout from './ui/components/layout/Layout';
import Home from './pages/home/Home';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import ProtectedRoute from './ProtectedRoute';
import UserDashboardLayout from './ui/components/Layout/UserDashboardLayout';
import VerificationSent from './pages/cartItems/cartItemsContent/VerificationSent';

import {
  RealEstateHome,
  SingleProductPage,
  ConsumerGoodsHome,
  HomeLivingHome,
  ElectronicsHome,
  FoodAndDrinkHome,
  CartItems,
  CheckoutItems,
  CheckoutPaymentSuccess,
  PageNotFound,
  // CategoryPage,
  // SubCategoryPage,
  UserDashboard,
  ShoppingOverview,
  // Summary,
  // Purchases,
  CreditWallet,
  DirectDebit,
  Favorites,
  RecentlyViewed,
  Notifications,
  AccountProfile,
} from './lazyImports';

import CartItemsSkeleton from './ui/components/Skeletons/CartItemsSkeleton';
import CheckoutItemsSkeleton from './ui/components/Skeletons/CheckoutItemsSkeleton';
import ProductDetailsSkeleton from './ui/components/Skeletons/ProductDetailsSkeleton';
import CheckoutPaymentSkeleton from './ui/components/Skeletons/CheckoutPaymentSkeleton';
import DashboardSummarySkeleton from './ui/components/Skeletons/DashboardSummarySkeleton';
import LandingPageSkeleton from './ui/components/Skeletons/LnadingPageSkeleton';
import SubCategoryPage from './pages/productCategories/SubCategoryPage';

import Summary from './pages/userDashboard/shopping/shoppingOverviewContents/Summary';
import Purchases from './pages/userDashboard/shopping/shoppingOverviewContents/purchase/Purchases';
import ForgotPassword from './Pages/forgotPassword/ForgotPassword';
import ResetPassword from './Pages/resetPassword/ResetPassword';
// export const Summary = lazy(
//   () =>
//     import('./pages/userDashboard/shopping/shoppingOverviewContents/Summary')
// );
// eslint-disable-next-line react/prop-types
const LazyRoute = ({ element }) => (
  <Suspense fallback={<ProductDetailsSkeleton showAside showRecommendations />}>
    {element}
  </Suspense>
);

// eslint-disable-next-line react/prop-types
const LazyHome = ({ element }) => (
  <Suspense fallback={<LandingPageSkeleton />}>{element}</Suspense>
);

const AppRoutes = () => (
  <>
    <Route path="" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route
        path="home-living"
        element={<LazyHome element={<HomeLivingHome />} />}
      />
      <Route
        path="electronics"
        element={<LazyHome element={<ElectronicsHome />} />}
      />
      <Route
        path="real-estate"
        element={<LazyHome element={<RealEstateHome />} />}
      />
      <Route
        path="food-drink"
        element={<LazyHome element={<FoodAndDrinkHome />} />}
      />
      <Route
        path="lifestyle"
        element={<LazyHome element={<ConsumerGoodsHome />} />}
      />

      <Route path=":categoryName/:subcategory" element={<SubCategoryPage />} />

      <Route
        path=":categoryName/:id/:slug"
        element={<LazyRoute element={<SingleProductPage />} />}
      />

      {/* <Route
        path="/:categoryName/:subcategory"
        element={<LazyRoute element={<SubCategoryPage />} />}
      /> */}
    </Route>

    <Route
      path="cart-items"
      element={
        <Suspense fallback={<CartItemsSkeleton />}>
          <CartItems />
        </Suspense>
      }
    />

    <Route element={<ProtectedRoute />}>
      <Route
        path="cart-items/checkout"
        element={
          <Suspense fallback={<CheckoutItemsSkeleton />}>
            <CheckoutItems />
          </Suspense>
        }
      />
      <Route path="verification-document-sent" element={<VerificationSent />} />
      <Route
        path="cart-items/checkout/payment-success"
        element={
          <Suspense fallback={<CheckoutPaymentSkeleton />}>
            <CheckoutPaymentSuccess />
          </Suspense>
        }
      />
    </Route>

    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    <Route path="*" element={<PageNotFound />} />

    <Route element={<ProtectedRoute />}>
      <Route element={<UserDashboardLayout />}>
        <Route
          path="user-dashboard"
          element={
            <Suspense fallback={<p>Loading Dashboard...</p>}>
              <UserDashboard />
            </Suspense>
          }
        >
          <Route
            path="shopping-overview"
            element={
              <Suspense fallback={<p>Loading Shopping Overview...</p>}>
                <ShoppingOverview />
              </Suspense>
            }
          >
            {/* { label: 'My account', href: '/user-dashboard/account' },
                { label: 'Shopping overview', href: '/user-dashboard/shopping-overview' },
                { label: 'Notifications', href: '/user-dashboard/notifications' },
                { label: 'Account profile', href: '/user-dashboard/account-profile' }, */}
            <Route
              path="summary"
              element={
                // <Suspense fallback={<DashboardSummarySkeleton />}>
                <Summary />
                // {/* </Suspense> */}
              }
            />
            <Route
              path="purchases"
              element={
                // <Suspense fallback={<DashboardSummarySkeleton />}>
                <Purchases />
                // {/* </Suspense> */}
              }
            />
            <Route
              path="credit-wallet"
              element={
                <Suspense fallback={<DashboardSummarySkeleton />}>
                  <CreditWallet />
                </Suspense>
              }
            />
            <Route
              path="favorites"
              element={
                <Suspense fallback={<DashboardSummarySkeleton />}>
                  <Favorites />
                </Suspense>
              }
            />
            <Route
              path="direct-debit"
              element={
                <Suspense fallback={<DashboardSummarySkeleton />}>
                  <DirectDebit />
                </Suspense>
              }
            />
            <Route
              path="recently-viewed"
              element={
                <Suspense fallback={<DashboardSummarySkeleton />}>
                  <RecentlyViewed />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="notifications"
            element={
              <Suspense fallback={<DashboardSummarySkeleton />}>
                <Notifications />
              </Suspense>
            }
          />
          <Route
            path="account-profile"
            element={
              <Suspense fallback={<DashboardSummarySkeleton />}>
                <AccountProfile />
              </Suspense>
            }
          />

          <Route
            path=":id/slug"
            element={
              <Suspense fallback={<ProductDetailsSkeleton />}>
                <SingleProductPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Route>
  </>
);

export default AppRoutes;
