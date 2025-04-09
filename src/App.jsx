// import "./index.css";
// import { lazy, Suspense } from "react";
// import ScrollToTop from "./utils/ScrollToTop";
// import "react-toastify/dist/ReactToastify.css";
// import Layout from "./ui/components/layout/Layout";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import UserDashboardLayout from "./ui/components/Layout/UserDashboardLayout";

// // Lazy-loaded components
// const Home = lazy(() => import("./pages/home/Home"));
// const Login = lazy(() => import("./pages/login/Login"));
// const SignUp = lazy(() => import("./pages/signUp/SignUp"));
// const CartItems = lazy(() => import("./pages/cartItems/CartItems"));
// const PageNotFound = lazy(() => import("./pages/pageNotFound/PageNotFound"));
// const UserDashboard = lazy(() => import("./pages/userDashboard/UserDashboard"));
// const CheckoutItems = lazy(() => import("./pages/checkoutItems/CheckoutItems"));
// const SubCategoryPage = lazy(() =>
//   import("./pages/productCategories/SubCategoryPage")
// );
// const SingleProductPage = lazy(() =>
//   import("./pages/productCategories/SingleProductPage")
// );
// const CategoryPage = lazy(() =>
//   import("./pages/productCategories/categoryPage/CategoryPage")
// );
// const Notifications = lazy(() =>
//   import("./pages/userDashboard/notifications/Notifications")
// );
// const AccountProfile = lazy(() =>
//   import("./pages/userDashboard/accountProfile/AccountProfile")
// );
// const Wallet = lazy(() =>
//   import("./pages/userDashboard/shopping/shoppingOverviewContents/Wallet")
// );
// const Summary = lazy(() =>
//   import("./pages/userDashboard/shopping/shoppingOverviewContents/Summary")
// );
// const Favorites = lazy(() =>
//   import("./pages/userDashboard/shopping/shoppingOverviewContents/Favorites")
// );
// const CheckoutPaymentSuccess = lazy(() =>
//   import("./pages/checkoutPaymentSuccess/CheckoutPaymentSuccess")
// );
// const ShoppingOverview = lazy(() =>
//   import("./pages/userDashboard/shopping/shoppingOverview/ShoppingOverview")
// );
// const Purchases = lazy(() =>
//   import(
//     "./pages/userDashboard/shopping/shoppingOverviewContents/purchase/Purchases"
//   )
// );
// const RecentlyViewed = lazy(() =>
//   import(
//     "./pages/userDashboard/shopping/shoppingOverviewContents/RecentlyViewed"
//   )
// );
// const ToastContainer = lazy(() =>
//   import("react-toastify").then((module) => ({
//     default: module.ToastContainer,
//   }))
// );

// const App = () => {
//   return (
//     <>
//       <Suspense fallback={null}>
//         <ToastContainer
//           position="bottom-left"
//           autoClose={5000}
//           hideProgressBar={true}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="yellow"
//         />
//       </Suspense>
//       <BrowserRouter>
//         <ScrollToTop />
//         <Suspense
//           fallback={
//             <div className="flex justify-center items-center bg-slate-400 h-screen w-full">
//               Normalizing quality standard of living....
//               <div className="lds-ripple">
//                 <div></div>
//                 <div></div>
//               </div>
//             </div>
//           }
//         >
//           <Routes>
//             <Route path="" element={<Layout />}>
//               <Route path="/" element={<Home />} />
//               <Route path="category/:categoryName" element={<CategoryPage />} />
//               <Route
//                 path="category/:categoryName/:subcategory"
//                 element={<SubCategoryPage />}
//               />
//               <Route
//                 path="category/:categoryName/:subcategory/:id/:slug"
//                 element={<SingleProductPage />}
//               />
//               <Route path=":id/:slug" element={<SingleProductPage />} />
//             </Route>
//             <Route path="cart-items" element={<CartItems />} />
//             <Route path="cart-items/checkout" element={<CheckoutItems />} />
//             <Route
//               path="cart-items/checkout/payment-success"
//               element={<CheckoutPaymentSuccess />}
//             />
//             <Route path="/sign-up" element={<SignUp />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<PageNotFound />} />
//             <Route path="" element={<UserDashboardLayout />}>
//               <Route path="/user-dashboard" element={<UserDashboard />}>
//                 <Route
//                   path="/user-dashboard/shopping-overview"
//                   element={<ShoppingOverview />}
//                 >
//                   <Route
//                     path="/user-dashboard/shopping-overview/summary"
//                     element={<Summary />}
//                   />
//                   <Route
//                     path="/user-dashboard/shopping-overview/purchases"
//                     element={<Purchases />}
//                   />
//                   <Route
//                     path="/user-dashboard/shopping-overview/wallet"
//                     element={<Wallet />}
//                   />
//                   <Route
//                     path="/user-dashboard/shopping-overview/favorites"
//                     element={<Favorites />}
//                   />
//                   <Route
//                     path="/user-dashboard/shopping-overview/recently-viewed"
//                     element={<RecentlyViewed />}
//                   />
//                 </Route>
//                 <Route
//                   path="/user-dashboard/notifications"
//                   element={<Notifications />}
//                 />
//                 <Route
//                   path="/user-dashboard/account-profile"
//                   element={<AccountProfile />}
//                 />
//                 <Route
//                   path="/user-dashboard/:id/:slug"
//                   element={<SingleProductPage />}
//                 />
//               </Route>
//             </Route>
//           </Routes>
//         </Suspense>
//       </BrowserRouter>
//     </>
//   );
// };

// export default App;

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import ScrollToTop from "./utils/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Layout from "./ui/components/layout/Layout";
import { CartItems } from "./pages/cartItems/CartItems";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserDashboard } from "./pages/userDashboard/UserDashboard";
import { CheckoutItems } from "./pages/checkoutItems/CheckoutItems";
import SubCategoryPage from "./pages/productCategories/SubCategoryPage";
import SingleProductPage from "./pages/productCategories/SingleProductPage";
import UserDashboardLayout from "./ui/components/Layout/UserDashboardLayout";
import CategoryPage from "./pages/productCategories/categoryPage/CategoryPage";
import { Notifications } from "./pages/userDashboard/notifications/Notifications";
import { AccountProfile } from "./pages/userDashboard/accountProfile/AccountProfile";
import { Wallet } from "./pages/userDashboard/shopping/shoppingOverviewContents/Wallet";
import { Summary } from "./pages/userDashboard/shopping/shoppingOverviewContents/Summary";
import { Favorites } from "./pages/userDashboard/shopping/shoppingOverviewContents/Favorites";
import { CheckoutPaymentSuccess } from "./pages/checkoutPaymentSuccess/CheckoutPaymentSuccess";
import { ShoppingOverview } from "./pages/userDashboard/shopping/shoppingOverview/ShoppingOverview";
import { Purchases } from "./pages/userDashboard/shopping/shoppingOverviewContents/purchase/Purchases";
import { RecentlyViewed } from "./pages/userDashboard/shopping/shoppingOverviewContents/RecentlyViewed";

const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="yellow"
      />
      <BrowserRouter>
        {/* <ToastContainer position="top-right" autoClose={3000} /> */}

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
              <Route
                path="/user-dashboard/:id/:slug"
                element={<SingleProductPage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
