import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './ui/components/layout/Layout';
import Home from './pages/home/Home';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import ProtectedRoute from './ProtectedRoute';
import UserDashboardLayout from './ui/components/layout/UserDashboardLayout';
import VerificationSent from './pages/cartItems/cartItemsContent/VerificationSent';
import PageNotFound from './pages/pageNotFound/PageNotFound';

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
  // PageNotFound,
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
  // AccountProfile,
} from './lazyImports';

import CartItemsSkeleton from './ui/components/skeletons/CartItemsSkeleton';
import CheckoutItemsSkeleton from './ui/components/skeletons/CheckoutItemsSkeleton';
import ProductDetailsSkeleton from './ui/components/skeletons/ProductDetailsSkeleton';
import CheckoutPaymentSkeleton from './ui/components/skeletons/CheckoutPaymentSkeleton';
import DashboardSummarySkeleton from './ui/components/skeletons/DashboardSummarySkeleton';
import SubCategoryPage from './pages/productCategories/SubCategoryPage';
import LandingPageSkeleton from './ui/components/skeletons/LandingPageSkeleton';

import Summary from './pages/userDashboard/shopping/shoppingOverviewContents/Summary';
import Purchases from './pages/userDashboard/shopping/shoppingOverviewContents/purchase/Purchases';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import ProfileSummary from './pages/userDashboard/accountProfile/contents/profileSummary/ProfileSummary';
import AccountVerification from './pages/userDashboard/accountProfile/contents/accountVerification/AccountVerification';
import DeliveryAddress from './pages/userDashboard/accountProfile/contents/deliveryAddress/DeliveryAddress';
import Feedback from './pages/userDashboard/accountProfile/contents/feedback/Feedback';
import ResolutionCentre from './pages/userDashboard/accountProfile/contents/resolutionCentre/ResolutionCentre';
import UserAccountProfile from './pages/userDashboard/accountProfile/UserAccountProfile';
import { DirectDebitSetUp1 } from './pages/checkoutItems/directDebitSetup/DirectDebitSetUp1';
import { DirectDebitSetUp2 } from './pages/checkoutItems/directDebitSetup/directDebitBankSetUp/DirectDebitSetUp2';
// export const Summary = lazy(
//   () =>
//     import('./pages/userDashboard/shopping/shoppingOverviewContents/Summary')
// );
// const LazyRoute = ({ element }) => (
//   <Suspense fallback={<ProductDetailsSkeleton showAside showRecommendations />}>
//     {element}
//   </Suspense>
// );

// const LazyHome = ({ element }) => (
//   <Suspense fallback={<LandingPageSkeleton />}>{element}</Suspense>
// );

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="home-living"
          element={
            <Suspense fallback={<LandingPageSkeleton />}>
              <HomeLivingHome />
            </Suspense>
          }
        />
        <Route
          path="electronics"
          element={
            <Suspense fallback={<LandingPageSkeleton />}>
              <ElectronicsHome />
            </Suspense>
          }
        />
        <Route
          path="real-estate"
          element={
            <Suspense fallback={<LandingPageSkeleton />}>
              <RealEstateHome />
            </Suspense>
          }
        />
        <Route
          path="food-drink"
          element={
            <Suspense fallback={<LandingPageSkeleton />}>
              <FoodAndDrinkHome />
            </Suspense>
          }
        />
        <Route
          path="lifestyle"
          element={
            <Suspense fallback={<LandingPageSkeleton />}>
              <ConsumerGoodsHome />
            </Suspense>
          }
        />

        <Route
          path=":categoryName/:subcategory"
          element={<SubCategoryPage />}
        />

        <Route
          path=":categoryName/:id/:slug"
          element={
            <Suspense
              fallback={
                <ProductDetailsSkeleton showAside showRecommendations />
              }
            >
              <SingleProductPage />
            </Suspense>
          }
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

        <Route
          path="cart-items/checkout/direct-debit-setup-1"
          element={<DirectDebitSetUp1 />}
        />

        <Route
          path="cart-items/checkout/direct-debit-setup-1/direct-debit-setup-2"
          element={<DirectDebitSetUp2 />}
        />

        <Route
          path="verification-document-sent"
          element={<VerificationSent />}
        />
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

            {/* //Account Profile Dashboard */}
            <Route
              path="account-profile"
              element={
                <Suspense fallback={<DashboardSummarySkeleton />}>
                  <UserAccountProfile />
                </Suspense>
              }
            >
              {/* { label: 'My account', href: '/user-dashboard/account' },
                { label: 'Shopping overview', href: '/user-dashboard/shopping-overview' },
                { label: 'Notifications', href: '/user-dashboard/notifications' },
                { label: 'Account profile', href: '/user-dashboard/account-profile' }, */}
              <Route
                path="profile-summary"
                element={
                  // <Suspense fallback={<DashboardSummarySkeleton />}>
                  <ProfileSummary />
                  // {/* </Suspense> */}
                }
              />
              <Route
                path="account-verification"
                element={
                  // <Suspense fallback={<DashboardSummarySkeleton />}>
                  <AccountVerification />
                  // {/* </Suspense> */}
                }
              />
              <Route
                path="delivery-address"
                element={
                  <Suspense fallback={<DashboardSummarySkeleton />}>
                    <DeliveryAddress />
                  </Suspense>
                }
              />
              <Route
                path="feedback"
                element={
                  <Suspense fallback={<DashboardSummarySkeleton />}>
                    <Feedback />
                  </Suspense>
                }
              />
              <Route
                path="resolution-centre"
                element={
                  <Suspense fallback={<DashboardSummarySkeleton />}>
                    <ResolutionCentre />
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
    </Routes>
  );
};

export default AppRoutes;
