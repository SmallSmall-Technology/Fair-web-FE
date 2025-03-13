import Home from "./Pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import ScrollToTop from "./utils/ScrollToTop";
import Layout from "./ui/components/layout/Layout";
import CartItems from "./Pages/cartItems/CartItems";
import { BrowserRouter, Route, Routes } from "react-router";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import SubCategoryPage from "./Pages/productCategories/SubCategoryPage";
import SingleProductPage from "./Pages/productCategories/SingleProductPage";
import CategoryPage from "./Pages/productCategories/categoryPage/CategoryPage";

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

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Cart items route */}
        <Route path="cart-items" element={<CartItems />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
