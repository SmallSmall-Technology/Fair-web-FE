import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScrollToTop from './utils/ScrollToTop';
import ProtectedRoute from './ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { restoreSession } from './features/auth/authSlice';

// Eagerly load layout and essential UI wrappers
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import Layout from './ui/components/layout/Layout';
import UserDashboardLayout from './ui/components/Layout/UserDashboardLayout';
import ProductDetailsSkeleton from './ui/components/Skeletons/ProductDetailsSkeleton';
import CheckoutItemsSkeleton from './ui/components/Skeletons/CheckoutItemsSkeleton';
import CheckoutPaymentSkeleton from './ui/components/Skeletons/CheckoutPaymentSkeleton';
import CartItemsSkeleton from './ui/components/Skeletons/CartItemsSkeleton';

// Lazy-loaded pages
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
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const runRestore = async () => {
      if (!isAuthenticated && !loading) {
        await dispatch(restoreSession()).unwrap();
      }
    };
    runRestore();
  }, [dispatch, isAuthenticated]);

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
              path="category/:categoryName"
              element={
                <Suspense
                  fallback={
                    <ProductDetailsSkeleton
                      showAside={true}
                      showRecommendations={true}
                    />
                  }
                >
                  <CategoryPage />
                </Suspense>
              }
            />
            <Route
              path="category/:categoryName/:subcategory"
              element={
                <Suspense
                  fallback={
                    <ProductDetailsSkeleton
                      showAside={true}
                      showRecommendations={true}
                    />
                  }
                >
                  <SubCategoryPage />
                </Suspense>
              }
            />

            <Route
              path="category/:categoryName/:subcategory/:id/:slug"
              element={
                <Suspense
                  fallback={
                    <ProductDetailsSkeleton
                      showAside={true}
                      showRecommendations={true}
                    />
                  }
                >
                  <SingleProductPage />
                </Suspense>
              }
            />

            <Route
              path=":id/:slug"
              element={
                <Suspense
                  fallback={
                    <ProductDetailsSkeleton
                      showAside={true}
                      showRecommendations={true}
                    />
                  }
                >
                  <SingleProductPage />
                </Suspense>
              }
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
                      <Suspense fallback={<p>Loading Summary...</p>}>
                        <Summary />
                      </Suspense>
                    }
                  />
                  <Route
                    path="purchases"
                    element={
                      <Suspense fallback={<p>Loading Purchases...</p>}>
                        <Purchases />
                      </Suspense>
                    }
                  />
                  <Route
                    path="wallet"
                    element={
                      <Suspense fallback={<p>Loading Wallet...</p>}>
                        <Wallet />
                      </Suspense>
                    }
                  />
                  <Route
                    path="favorites"
                    element={
                      <Suspense fallback={<p>Loading Favorites...</p>}>
                        <Favorites />
                      </Suspense>
                    }
                  />
                  <Route
                    path="direct-debit"
                    element={
                      <Suspense fallback={<p>Loading Favorites...</p>}>
                        <DirectDebit />
                      </Suspense>
                    }
                  />

                  <Route
                    path="recently-viewed"
                    element={
                      <Suspense fallback={<p>Loading Recently Viewed...</p>}>
                        <RecentlyViewed />
                      </Suspense>
                    }
                  />
                </Route>

                <Route
                  path="notifications"
                  element={
                    <Suspense fallback={<p>Loading Notifications...</p>}>
                      <Notifications />
                    </Suspense>
                  }
                />
                <Route
                  path="account-profile"
                  element={
                    <Suspense fallback={<p>Loading Account Profile...</p>}>
                      <AccountProfile />
                    </Suspense>
                  }
                />
                <Route
                  path=":id/:slug"
                  element={
                    <Suspense fallback={<p>Loading Product Page...</p>}>
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
