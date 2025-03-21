import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import ScrollToTop from "./utils/ScrollToTop";
import Layout from "./ui/components/layout/Layout";
import CartItems from "./pages/cartItems/CartItems";
import { BrowserRouter, Route, Routes } from "react-router";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { UserDashboard } from "./pages/userDashboard/UserDashboard";
import { CheckoutItems } from "./pages/checkoutItems/CheckoutItems";
import SubCategoryPage from "./pages/productCategories/SubCategoryPage";
import UserDashboardLayout from "./ui/components/Layout/UserDashboardLayout";
import SingleProductPage from "./pages/productCategories/SingleProductPage";
import CategoryPage from "./pages/productCategories/categoryPage/CategoryPage";
import { Notifications } from "./pages/userDashboard/notifications/Notifications";
import { AccountProfile } from "./pages/userDashboard/accountProfile/AccountProfile";
import { Wallet } from "./pages/userDashboard/shopping/shoppingOverviewContents/Wallet";
import { Summary } from "./pages/userDashboard/shopping/shoppingOverviewContents/Summary";
import { Favorites } from "./pages/userDashboard/shopping/shoppingOverviewContents/Favorites";
import { Purchases } from "./pages/userDashboard/shopping/shoppingOverviewContents/Purchases";
import { CheckoutPaymentSuccess } from "./pages/checkoutPaymentSuccess/CheckoutPaymentSuccess";
import { ShoppingOverview } from "./pages/userDashboard/shopping/shoppingOverview/ShoppingOverview";
import { RecentlyViewed } from "./pages/userDashboard/shopping/shoppingOverviewContents/RecentlyViewed";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Layout />}>
          {/* Home route */}
          <Route path="/" element={<Home />} />

          {/* Category and subcategory routes */}
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route
            path="category/:categoryName/:subcategory"
            element={<SubCategoryPage />}
          />
          {/* Nested route for single product */}
          <Route
            path="category/:categoryName/:subcategory/:id/:slug"
            element={<SingleProductPage />}
          />
          <Route path=":id/:slug" element={<SingleProductPage />} />
        </Route>
        {/* Cart items route and checkout */}
        <Route path="cart-items" element={<CartItems />} />
        <Route path="cart-items/checkout" element={<CheckoutItems />}></Route>
        <Route
          path="cart-items/checkout/payment-success"
          element={<CheckoutPaymentSuccess />}
        ></Route>

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<PageNotFound />} />

        {/* User Dashboard */}
        <Route path="" element={<UserDashboardLayout />}>
          <Route path="/user-dashboard" element={<UserDashboard />}>
            {/* Shopping overview */}
            <Route
              path="/user-dashboard/shopping-overview"
              element={<ShoppingOverview />}
            >
              {/* Shopping overview summary */}
              <Route
                path="/user-dashboard/shopping-overview/summary"
                element={<Summary />}
              />
              {/* Shopping overview purchases */}
              <Route
                path="/user-dashboard/shopping-overview/purchases"
                element={<Purchases />}
              />
              {/* Shopping overview wallet */}
              <Route
                path="/user-dashboard/shopping-overview/wallet"
                element={<Wallet />}
              />
              {/* Shopping overview favorites */}
              <Route
                path="/user-dashboard/shopping-overview/favorites"
                element={<Favorites />}
              />
              {/* Shopping overview recently viewes */}
              <Route
                path="/user-dashboard/shopping-overview/recently-viewed"
                element={<RecentlyViewed />}
              />
            </Route>

            {/* Notifications */}
            <Route
              path="/user-dashboard/notifications"
              element={<Notifications />}
            >
              <Route
                path="/user-dashboard/notifications/acc"
                // element={<Summary />}
              ></Route>
            </Route>

            {/* Account profile */}
            <Route
              path="/user-dashboard/account-profile"
              element={<AccountProfile />}
            >
              <Route
                path="/user-dashboard/account-profile/"
                // element={<Summary />}
              ></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
