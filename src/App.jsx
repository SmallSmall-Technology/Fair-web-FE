import Home from "./Pages/home/Home";
import ScrollToTop from "./utils/ScrollToTop";
import Layout from "./ui/components/layout/Layout";
import CartItems from "./pages/cartItems/CartItems";
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
          <Route path="/" element={<Home />} />
          <Route path="cart-items" element={<CartItems />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route
            path="category/:categoryName/:subcategory"
            element={<SubCategoryPage />}
          ></Route>
          <Route
            path="category/:categoryName/:subcategory/:id/:slug"
            element={<SingleProductPage />}
          />
          <Route path=":id/:slug" element={<SingleProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
