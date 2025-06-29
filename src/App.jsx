import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from './utils/ScrollToTop';
import ProtectedRoute from './ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { restoreSession } from './features/auth/authSlice';

const LazyRoute = ({ element }) => (
  <Suspense
    fallback={
      <ProductDetailsSkeleton showAside={true} showRecommendations={true} />
    }
  >
    {element}
  </Suspense>
);

const LazyHome = ({ element }) => (
  <Suspense fallback={<LandingPageSkeleton />}>{element}</Suspense>
);

// Eagerly load layout and essential UI wrappers
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import Layout from './ui/components/layout/Layout';
import CartItemsSkeleton from './ui/components/Skeletons/CartItemsSkeleton';
import UserDashboardLayout from './ui/components/Layout/UserDashboardLayout';
import VerificationSent from './pages/cartItems/cartItemsContent/VerificationSent';
import CheckoutItemsSkeleton from './ui/components/Skeletons/CheckoutItemsSkeleton';
import ProductDetailsSkeleton from './ui/components/Skeletons/ProductDetailsSkeleton';
import CheckoutPaymentSkeleton from './ui/components/Skeletons/CheckoutPaymentSkeleton';
import DashboardSummarySkeleton from './ui/components/Skeletons/DashboardSummarySkeleton';
import LandingPageSkeleton from './ui/components/Skeletons/LnadingPageSkeleton';

const RealEstateHome = lazy(
  () => import('./pages/home/realEstateHome/RealEstateHome')
);

const ConsumerGoodsHome = lazy(
  () => import('./pages/home/consumerGoods/ConsumerGoodsHome')
);
const HomeLivingHome = lazy(
  () => import('./pages/home/homeLivingLandingPage/HomeLivingHome')
);
const ElectronicsHome = lazy(
  () => import('./pages/home/electronicsHome/ElectronicsHome')
);
const FoodAndDrinkHome = lazy(
  () => import('./pages/home/foodAndDrink/FoodAndDrinkHome')
);
const CartItems = lazy(() => import('./pages/cartItems/CartItems'));
const CheckoutItems = lazy(() => import('./pages/checkoutItems/CheckoutItems'));
const CheckoutPaymentSuccess = lazy(
  () => import('./pages/checkoutPaymentSuccess/CheckoutPaymentSuccess')
);
const PageNotFound = lazy(() => import('./pages/pageNotFound/PageNotFound'));

const CategoryPage = lazy(
  () => import('./pages/productCategories/categoryPage/CategoryPage')
);
const SubCategoryPage = lazy(
  () => import('./pages/productCategories/SubCategoryPage')
);
const SingleProductPage = lazy(
  () => import('./pages/productCategories/SingleProductPage')
);

const UserDashboard = lazy(() => import('./pages/userDashboard/UserDashboard'));
const ShoppingOverview = lazy(
  () =>
    import('./pages/userDashboard/shopping/shoppingOverview/ShoppingOverview')
);
const Summary = lazy(
  () =>
    import('./pages/userDashboard/shopping/shoppingOverviewContents/Summary')
);
const Purchases = lazy(
  () =>
    import(
      './pages/userDashboard/shopping/shoppingOverviewContents/purchase/Purchases'
    )
);
const Wallet = lazy(
  () => import('./pages/userDashboard/shopping/shoppingOverviewContents/Wallet')
);
const DirectDebit = lazy(
  () =>
    import(
      './pages/userDashboard/shopping/shoppingOverviewContents/DirectDebit'
    )
);
const Favorites = lazy(
  () =>
    import('./pages/userDashboard/shopping/shoppingOverviewContents/Favorites')
);
const RecentlyViewed = lazy(
  () =>
    import(
      './pages/userDashboard/shopping/shoppingOverviewContents/RecentlyViewed'
    )
);

const Notifications = lazy(
  () => import('./pages/userDashboard/notifications/Notifications')
);
const AccountProfile = lazy(
  () => import('./pages/userDashboard/accountProfile/AccountProfile')
);

const App = () => {
  // const dispatch = useDispatch();
  // const { loading, isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const runRestore = async () => {
  //     if (!isAuthenticated && !loading) {
  //       await dispatch(restoreSession()).unwrap();
  //     }
  //   };
  //   runRestore();
  // }, [dispatch, isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="yellow"
        />
        <Routes>
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
            <Route
              path="category/:categoryName"
              element={<LazyHome element={<CategoryPage />} />}
            />
            <Route
              path="category/:categoryName/:subcategory"
              element={<LazyRoute element={<SubCategoryPage />} />}
            />
            <Route
              path="category/:categoryName/:subcategory/:id/:slug"
              element={<LazyRoute element={<SingleProductPage />} />}
            />
            <Route
              path=":id/:slug"
              element={<LazyRoute element={<SingleProductPage />} />}
            />
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
                  <Route
                    path="summary"
                    element={
                      <Suspense fallback={<DashboardSummarySkeleton />}>
                        <Summary />
                      </Suspense>
                    }
                  />
                  <Route
                    path="purchases"
                    element={
                      <Suspense fallback={<DashboardSummarySkeleton />}>
                        <Purchases />
                      </Suspense>
                    }
                  />
                  <Route
                    path="wallet"
                    element={
                      <Suspense fallback={<DashboardSummarySkeleton />}>
                        <Wallet />
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
                  path=":id/:slug"
                  element={
                    <Suspense fallback={<DashboardSummarySkeleton />}>
                      <SingleProductPage />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;