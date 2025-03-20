import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import ScrollToTop from "./utils/ScrollToTop";
import Layout from "./ui/components/layout/Layout";
import CartItems from "./pages/cartItems/CartItems";
import { BrowserRouter, Route, Routes } from "react-router";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { CheckoutItems } from "./pages/checkoutItems/CheckoutItems";
import SubCategoryPage from "./pages/productCategories/SubCategoryPage";
import SingleProductPage from "./pages/productCategories/SingleProductPage";
import CategoryPage from "./pages/productCategories/categoryPage/CategoryPage";

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

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
