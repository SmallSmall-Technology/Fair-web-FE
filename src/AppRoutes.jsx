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
  UserDashboard,
  ShoppingOverview,
  CreditWallet,
  DirectDebit,
  Favorites,
  RecentlyViewed,
  Notifications,
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
import TermsOfUse from './pages/termsOfUse/TermsOfUse';
import { DirectDebitSetUp1 } from './pages/checkoutItems/directDebitSetup/DirectDebitSetUp1';
import { DirectDebitSetUp2 } from './pages/checkoutItems/directDebitSetup/directDebitBankSetUp/DirectDebitSetUp2';
import MonoSetupPaymentSuccess from './pages/checkoutItems/directDebitSetup/directDebitBankSetUp/MonoSetupPaymentSuccess';

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

        <Route path=":category/:sub_category" element={<SubCategoryPage />} />

        <Route
          path=":category/:sub_category/:productID/:slug"
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

        <Route
          path="terms-of-use"
          element={
            <Suspense fallback={<LandingPageSkeleton />}>
              <TermsOfUse />
            </Suspense>
          }
        />

        {/* <Route
        path="/:categoryName/:subcategory"
        element={<LazyRoute element={<SubCategoryPage />} />}
      /> */}

        <Route path=":category/*" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
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
          path="cart-items/checkout/direct-debit-setup-1/direct-debit-setup-2/mono-setup-payment-success"
          element={<MonoSetupPaymentSuccess />}
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
              <Route path="summary" element={<Summary />} />
              <Route path="purchases" element={<Purchases />} />
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
              <Route path="*" element={<PageNotFound />} />
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
              <Route path="profile-summary" element={<ProfileSummary />} />
              <Route
                path="account-verification"
                element={<AccountVerification />}
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
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route
              path=":id/slug"
              element={
                <Suspense fallback={<ProductDetailsSkeleton />}>
                  <SingleProductPage />
                </Suspense>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
